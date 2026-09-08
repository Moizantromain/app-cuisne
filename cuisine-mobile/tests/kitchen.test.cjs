const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const vm = require('node:vm');
function load(file, imports = {}) {
  const context = { exports: {}, require: name => imports[name] };
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(require.resolve(file), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, context);
  return context.exports;
}
const recipesModule = load('../src/data/recipes.ts');
const { createKitchenStore, mergeIngredients, recipeIngredients, parseItem, decodeKitchen } = load('../src/state/kitchen.ts', { '../data/recipes': recipesModule });
const { recipes } = recipesModule;
function memoryStorage(initial = null) {
  let saved = initial;
  return { getItem: async () => saved, setItem: async (_key, value) => { saved = value; } };
}

test('favorites, portions, manual items and checkmarks survive a fresh store', async () => {
  const storage = memoryStorage();
  const first = createKitchenStore(storage);
  await first.hydrate();
  await first.toggleFavorite(recipes[0].id);
  await first.addIngredients(recipeIngredients(recipes[0], 4));
  await first.addIngredients([parseItem('Pommes', '2,5', 'kg', '')]);
  await first.toggleItem(first.getSnapshot().data.items[0].id);
  const reopened = createKitchenStore(storage);
  await reopened.hydrate();
  const data = reopened.getSnapshot().data;
  assert.equal(data.favorites[0], recipes[0].id);
  assert.equal(data.items.find(item => item.name === 'Feta').quantity, 240);
  assert.equal(data.items.find(item => item.name === 'Pommes').quantity, 2.5);
  assert.equal(data.items[0].checked, true);
  await reopened.toggleFavorite(recipes[0].id);
  const again = createKitchenStore(storage);
  await again.hydrate();
  assert.equal(again.getSnapshot().data.favorites.length, 0);
});

test('matching units merge, incompatible units and purchased items remain separate', () => {
  let items = mergeIngredients([], [{ name: 'Farine', quantity: 200, unit: 'g' }]);
  items = mergeIngredients(items, [{ name: ' farine ', quantity: 50, unit: 'G' }, { name: 'Farine', quantity: 1, unit: 'kg' }]);
  assert.equal(items.length, 2);
  assert.equal(items[0].quantity, 250);
  items[0].checked = true;
  const merged = mergeIngredients(items, [{ name: 'Farine', quantity: 100, unit: 'g' }]);
  assert.equal(merged.length, 3);
  assert.equal(merged[0].quantity, 250);
  assert.equal(merged[2].checked, false);
});

test('seasoning notes stay readable and are not turned into numeric quantities', () => {
  const scaled = recipeIngredients(recipes[5], 1);
  assert.equal(scaled[2].quantity, undefined);
  assert.equal(scaled[2].note, 'Une pincée');
  const items = mergeIngredients(mergeIngredients([], scaled), scaled);
  assert.equal(items.length, 3);
  assert.equal(items[0].quantity, 75);
  assert.equal(items[2].note, 'Une pincée');
  assert.throws(() => recipeIngredients(recipes[0], 0));
});

test('concurrent actions are serialized without dropping favorites or ingredients', async () => {
  const store = createKitchenStore(memoryStorage());
  await store.hydrate();
  await Promise.all([store.toggleFavorite('first'), store.toggleFavorite('second'), store.addIngredients([{ name: 'Sel' }]), store.addIngredients([{ name: 'Poivre' }])]);
  assert.equal(store.getSnapshot().data.favorites.length, 2);
  assert.equal(store.getSnapshot().data.items.length, 2);
  assert.equal(store.getSnapshot().saving, false);
});

test('failed writes do not report success or discard saved state and can be retried', async () => {
  let fail = false;
  const storage = memoryStorage();
  const store = createKitchenStore({ getItem: storage.getItem, setItem: async (key, value) => { if (fail) throw new Error('disk full'); await storage.setItem(key, value); } });
  await store.hydrate();
  await store.toggleFavorite('saved');
  fail = true;
  assert.equal(await store.toggleFavorite('unsaved'), false);
  assert.equal(store.getSnapshot().data.favorites.length, 1);
  assert.ok(store.getSnapshot().error);
  fail = false;
  assert.equal(await store.toggleFavorite('retried'), true);
  assert.equal(store.getSnapshot().error, '');
  assert.equal(store.getSnapshot().data.favorites.length, 2);
});

test('failed reads do not overwrite existing data, retry restores them', async () => {
  let fail = true;
  let writes = 0;
  const store = createKitchenStore({ getItem: async () => { if (fail) throw new Error('unavailable'); return JSON.stringify({ version: 1, favorites: ['saved'], items: [] }); }, setItem: async () => { writes++; } });
  await store.hydrate();
  assert.equal(store.getSnapshot().ready, false);
  assert.equal(await store.toggleFavorite('new'), false);
  assert.equal(writes, 0);
  fail = false;
  await store.hydrate();
  assert.equal(store.getSnapshot().data.favorites[0], 'saved');
});

test('corrupt or unsupported saved data is rejected', () => {
  assert.throws(() => decodeKitchen('{broken'));
  assert.throws(() => decodeKitchen(JSON.stringify({ version: 2, favorites: [], items: [] })));
  assert.throws(() => decodeKitchen(JSON.stringify({ version: 1, favorites: [], items: [{ id: 'x', name: 'Milk', checked: false, quantity: -2 }] })));
});

test('editing, deletion and clearing purchased items persist and preserve remaining items', async () => {
  const storage = memoryStorage();
  const store = createKitchenStore(storage);
  await store.hydrate();
  await store.addIngredients([{ name: 'A', quantity: 1 }, { name: 'B' }, { name: 'C' }]);
  const [a, b, c] = store.getSnapshot().data.items;
  await store.editItem(a.id, { name: 'Pommes', quantity: 3, unit: 'kg' });
  await store.toggleItem(b.id);
  await store.clearPurchased();
  await store.removeItem(c.id);
  const reopened = createKitchenStore(storage);
  await reopened.hydrate();
  assert.equal(reopened.getSnapshot().data.items.length, 1);
  assert.equal(reopened.getSnapshot().data.items[0].quantity, 3);
  assert.equal(reopened.getSnapshot().data.items[0].name, 'Pommes');
});

test('manual entry accepts decimal commas and rejects empty names and invalid quantities', () => {
  assert.equal(parseItem(' ', '2', '', ''), null);
  for (const invalid of ['0', '-1', 'abc', 'Infinity']) assert.equal(parseItem('Pommes', invalid, '', ''), null);
  assert.equal(parseItem('Pommes', '0,5', 'kg', '').quantity, 0.5);
  assert.equal(parseItem('Pain', '', '', '').quantity, undefined);
});
