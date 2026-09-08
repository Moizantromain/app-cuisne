import { normalizeSearch, type Ingredient, type Recipe } from '../data/recipes';

export type ShoppingItem = Ingredient & { id: string; checked: boolean };
export type KitchenData = { version: 1; favorites: string[]; items: ShoppingItem[] };
export type Storage = { getItem(key: string): Promise<string | null>; setItem(key: string, value: string): Promise<void> };
export const STORAGE_KEY = 'cuisine.kitchen.v1';
const emptyData = (): KitchenData => ({ version: 1, favorites: [], items: [] });
const clean = (value: string) => normalizeSearch(value).trim().replace(/\s+/g, ' ');
let sequence = 0;
const newId = () => `${Date.now().toString(36)}-${++sequence}`;

export function decodeKitchen(raw: string | null): KitchenData {
  if (raw === null) return emptyData();
  const data = JSON.parse(raw);
  if (data?.version !== 1 || !Array.isArray(data.favorites) || !data.favorites.every((id: unknown) => typeof id === 'string') || !Array.isArray(data.items)) throw new Error('Invalid saved data');
  for (const item of data.items) {
    if (!item || typeof item.id !== 'string' || typeof item.name !== 'string' || !item.name.trim() || typeof item.checked !== 'boolean' ||
      (item.quantity !== undefined && (typeof item.quantity !== 'number' || !Number.isFinite(item.quantity) || item.quantity <= 0)) ||
      (item.unit !== undefined && typeof item.unit !== 'string') || (item.note !== undefined && typeof item.note !== 'string')) throw new Error('Invalid shopping item');
  }
  if (new Set(data.items.map((item: ShoppingItem) => item.id)).size !== data.items.length) throw new Error('Duplicate item IDs');
  return { version: 1, favorites: [...new Set<string>(data.favorites)], items: data.items };
}

export function mergeIngredients(items: ShoppingItem[], incoming: Ingredient[]): ShoppingItem[] {
  const result = items.map(item => ({ ...item }));
  for (const ingredient of incoming) {
    const existing = result.find(item => !item.checked && clean(item.name) === clean(ingredient.name) &&
      clean(item.unit ?? '') === clean(ingredient.unit ?? '') && clean(item.note ?? '') === clean(ingredient.note ?? '') &&
      (item.quantity === undefined) === (ingredient.quantity === undefined));
    if (existing) {
      if (existing.quantity !== undefined && ingredient.quantity !== undefined) existing.quantity = Math.round((existing.quantity + ingredient.quantity) * 1e6) / 1e6;
    } else result.push({ ...ingredient, id: newId(), checked: false });
  }
  return result;
}

export function recipeIngredients(recipe: Recipe, portions: number): Ingredient[] {
  if (!Number.isInteger(portions) || portions < 1 || portions > 20) throw new Error('Invalid portions');
  return recipe.ingredients.map(item => ({ ...item, quantity: item.quantity === undefined ? undefined : item.quantity * portions / recipe.portions }));
}

export function parseItem(name: string, amount: string, unit: string, note: string): Ingredient | null {
  const quantity = amount.trim() ? Number(amount.trim().replace(',', '.')) : undefined;
  if (!name.trim() || (quantity !== undefined && (!Number.isFinite(quantity) || quantity <= 0))) return null;
  return { name: name.trim(), quantity, unit: unit.trim() || undefined, note: note.trim() || undefined };
}

// Mutations are serialized and published only after a successful write.
// A failed read never silently replaces existing saved data with an empty list.
export function createKitchenStore(storage: Storage) {
  let snapshot = { data: emptyData(), ready: false, saving: false, error: '' };
  const serverSnapshot = snapshot;
  const listeners = new Set<() => void>();
  let loading: Promise<void> | undefined;
  let queue = Promise.resolve();
  let pending = 0;
  const publish = (patch: Partial<typeof snapshot>) => {
    snapshot = { ...snapshot, ...patch };
    listeners.forEach(listener => listener());
  };
  async function hydrate() {
    if (snapshot.ready) return;
    if (loading) return loading;
    loading = (async () => {
      try {
        const data = decodeKitchen(await storage.getItem(STORAGE_KEY));
        publish({ data, ready: true, error: '' });
      } catch {
        publish({ error: 'Impossible de lire vos données enregistrées. Réessayez pour retrouver vos favoris et vos courses.' });
      } finally { loading = undefined; }
    })();
    return loading;
  }
  async function commit(update: (data: KitchenData) => KitchenData): Promise<boolean> {
    if (!snapshot.ready) return false;
    pending++;
    publish({ saving: true });
    let success = false;
    const work = queue.then(async () => {
      try {
        const next = update(snapshot.data);
        await storage.setItem(STORAGE_KEY, JSON.stringify(next));
        publish({ data: next, error: '' });
        success = true;
      } catch {
        publish({ error: 'La sauvegarde a échoué. Votre dernière action n’a pas été enregistrée. Réessayez.' });
      } finally {
        pending--;
        publish({ saving: pending > 0 });
      }
    });
    queue = work;
    await work;
    return success;
  }
  return {
    subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    getSnapshot: () => snapshot,
    getServerSnapshot: () => serverSnapshot,
    hydrate,
    toggleFavorite: (id: string) => commit(data => ({ ...data, favorites: data.favorites.includes(id) ? data.favorites.filter(value => value !== id) : [...data.favorites, id] })),
    addIngredients: (items: Ingredient[]) => commit(data => ({ ...data, items: mergeIngredients(data.items, items) })),
    toggleItem: (id: string) => commit(data => ({ ...data, items: data.items.map(item => item.id === id ? { ...item, checked: !item.checked } : item) })),
    editItem: (id: string, value: Ingredient) => commit(data => ({ ...data, items: data.items.map(item => item.id === id ? { ...value, id, checked: item.checked } : item) })),
    removeItem: (id: string) => commit(data => ({ ...data, items: data.items.filter(item => item.id !== id) })),
    clearPurchased: () => commit(data => ({ ...data, items: data.items.filter(item => !item.checked) })),
  };
}
