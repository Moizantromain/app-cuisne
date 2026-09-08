const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const vm = require('node:vm');
const source = fs.readFileSync(require.resolve('../src/data/recipes.ts'), 'utf8');
const context = { exports: {} };
vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, context);
const { recipes, searchRecipes, ingredientAmount, duration } = context.exports;

test('search tolerates accents, case, whitespace and ingredient names', () => {
  assert.equal(searchRecipes('  PATES  BASILIC ', 'Tout')[0].id, 'pates-tomates-basilic');
  assert.equal(searchRecipes('oeufs', 'Tout').length, 2);
  assert.equal(searchRecipes('FETA', 'Tout')[0].id, 'salade-mediterraneenne');
});
test('category and text filters combine, including no results', () => {
  assert.equal(searchRecipes('chocolat', 'Plats').length, 0);
  assert.equal(searchRecipes('introuvable', 'Tout').length, 0);
  assert.equal(searchRecipes('', 'Tout').length, 6);
  assert.equal(searchRecipes('', 'Petit-déjeuner').length, 2);
});
test('portions scale whole and fractional quantities without changing the recipe', () => {
  const feta = recipes[0].ingredients[2];
  assert.equal(ingredientAmount(feta, 4, 2), '240 g');
  assert.equal(ingredientAmount(feta, 1, 2), '60 g');
  assert.equal(ingredientAmount(recipes[0].ingredients[1], 1, 2), '0,25');
  assert.equal(feta.quantity, 120);
});
test('unquantified seasonings stay unchanged', () => {
  const seasoning = recipes[0].ingredients.at(-1);
  assert.equal(ingredientAmount(seasoning, 20, 2), 'Selon le goût');
  assert.equal(ingredientAmount(recipes[5].ingredients[2], 1, 4), 'Une pincée');
});
test('catalogue has unique routes and complete recipes, long durations include rest', () => {
  assert.equal(new Set(recipes.map(recipe => recipe.id)).size, recipes.length);
  for (const recipe of recipes) {
    assert.ok(recipe.portions > 0 && recipe.minutes >= recipe.prep);
    assert.ok(recipe.ingredients.length >= 3 && recipe.steps.length >= 3);
  }
  assert.equal(duration(195), '3 h 15');
});
