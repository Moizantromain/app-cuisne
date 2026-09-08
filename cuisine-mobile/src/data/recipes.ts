export type Ingredient = { name: string; quantity?: number; unit?: string; note?: string };
export type Recipe = {
  id: string; title: string; category: string; origin: string; description: string;
  minutes: number; prep: number; portions: number; image: string; tags: string[];
  ingredients: Ingredient[]; steps: string[]; tip: string;
};

export const recipes: Recipe[] = [
  {
    id: 'salade-mediterraneenne', title: 'Salade méditerranéenne', category: 'Entrées', origin: 'Grèce',
    description: 'Des tomates juteuses, du concombre croquant et de la feta. Un peu de soleil dans l’assiette, tout simplement.',
    minutes: 15, prep: 15, portions: 2, image: 'photo-1512621776951-a57141f2eefd', tags: ['Végétarien', 'Sans cuisson'],
    ingredients: [{ name: 'Tomates', quantity: 3 }, { name: 'Concombre', quantity: 0.5 }, { name: 'Feta', quantity: 120, unit: 'g' }, { name: 'Olives', quantity: 60, unit: 'g' }, { name: 'Huile d’olive', quantity: 2, unit: 'c. à soupe' }, { name: 'Jus de citron', quantity: 1, unit: 'c. à soupe' }, { name: 'Origan, sel et poivre', note: 'Selon le goût' }],
    steps: ['Lavez les tomates et le concombre. Coupez-les en morceaux et déposez-les dans un saladier.', 'Ajoutez la feta émiettée et les olives.', 'Mélangez l’huile d’olive et le jus de citron. Versez sur les légumes, ajoutez l’origan et assaisonnez à votre goût.', 'Mélangez délicatement et servez frais.'],
    tip: 'Ajoutez la vinaigrette juste avant de servir pour garder les légumes bien croquants.',
  },
  {
    id: 'pates-tomates-basilic', title: 'Pâtes aux tomates & basilic', category: 'Plats', origin: 'Italie',
    description: 'La douceur des tomates mijotées, du basilic frais et des pâtes al dente. Le bonheur tient parfois à quelques ingrédients.',
    minutes: 25, prep: 10, portions: 2, image: 'photo-1473093295043-cdd812d0e601', tags: ['Végétarien', 'Facile'],
    ingredients: [{ name: 'Pâtes', quantity: 200, unit: 'g' }, { name: 'Tomates concassées', quantity: 400, unit: 'g' }, { name: 'Ail', quantity: 1, unit: 'gousse' }, { name: 'Huile d’olive', quantity: 1, unit: 'c. à soupe' }, { name: 'Parmesan', quantity: 30, unit: 'g' }, { name: 'Basilic, sel et poivre', note: 'Selon le goût' }],
    steps: ['Faites bouillir une grande casserole d’eau salée. Émincez l’ail.', 'Chauffez l’huile dans une poêle et faites revenir l’ail une minute. Ajoutez les tomates et laissez mijoter 15 minutes.', 'Pendant ce temps, faites cuire les pâtes selon les indications du paquet. Réservez une tasse d’eau de cuisson avant de les égoutter.', 'Mélangez les pâtes à la sauce, avec un peu d’eau de cuisson si besoin. Ajoutez le basilic et le parmesan, puis servez.'],
    tip: 'L’eau de cuisson aide la sauce à bien enrober les pâtes. Ajoutez-la petit à petit.',
  },
  {
    id: 'tartines-avocat', title: 'Tartines à l’avocat', category: 'Petit-déjeuner', origin: 'Cuisine du quotidien',
    description: 'Du pain doré, un avocat crémeux et une touche de citron pour commencer la journée avec gourmandise.',
    minutes: 10, prep: 8, portions: 2, image: 'photo-1525351484163-7529414344d8', tags: ['Végétalien', 'Express'],
    ingredients: [{ name: 'Pain de campagne', quantity: 2, unit: 'tranches' }, { name: 'Avocat', quantity: 1 }, { name: 'Jus de citron', quantity: 1, unit: 'c. à soupe' }, { name: 'Graines de sésame', quantity: 1, unit: 'c. à café' }, { name: 'Sel et poivre', note: 'Selon le goût' }],
    steps: ['Faites griller les tranches de pain.', 'Coupez l’avocat en deux, retirez le noyau et écrasez la chair avec le jus de citron.', 'Étalez l’avocat sur le pain, parsemez de sésame et assaisonnez. Servez aussitôt.'],
    tip: 'Un avocat mûr doit céder légèrement sous la pression du doigt.',
  },
  {
    id: 'curry-pois-chiches', title: 'Curry doux de pois chiches', category: 'Plats', origin: 'Inspiré de l’Inde',
    description: 'Un plat généreux au lait de coco, délicatement épicé et parfait pour les soirs où l’on a envie de réconfort.',
    minutes: 30, prep: 10, portions: 4, image: 'photo-1547592180-85f173990554', tags: ['Végétalien', 'À préparer à l’avance'],
    ingredients: [{ name: 'Pois chiches cuits et égouttés', quantity: 500, unit: 'g' }, { name: 'Lait de coco', quantity: 400, unit: 'ml' }, { name: 'Tomates concassées', quantity: 200, unit: 'g' }, { name: 'Oignon', quantity: 1 }, { name: 'Curry doux', quantity: 2, unit: 'c. à café' }, { name: 'Huile d’olive', quantity: 1, unit: 'c. à soupe' }, { name: 'Sel', note: 'Selon le goût' }],
    steps: ['Épluchez et émincez l’oignon. Faites-le revenir 5 minutes dans l’huile.', 'Ajoutez le curry et mélangez pendant 30 secondes.', 'Versez les tomates, le lait de coco et les pois chiches. Mélangez et laissez mijoter 15 minutes à feu doux.', 'Goûtez, ajustez l’assaisonnement et servez dans des bols.'],
    tip: 'Pour une sauce plus épaisse, écrasez une petite partie des pois chiches dans la casserole.',
  },
  {
    id: 'pancakes-moelleux', title: 'Pancakes du dimanche', category: 'Petit-déjeuner', origin: 'États-Unis',
    description: 'Une pile de pancakes tendres et dorés, à partager lors d’un petit-déjeuner qui prend son temps.',
    minutes: 25, prep: 10, portions: 4, image: 'photo-1528207776546-365bb710ee93', tags: ['Végétarien', 'À partager'],
    ingredients: [{ name: 'Farine', quantity: 200, unit: 'g' }, { name: 'Lait', quantity: 250, unit: 'ml' }, { name: 'Œufs', quantity: 2 }, { name: 'Sucre', quantity: 20, unit: 'g' }, { name: 'Levure chimique', quantity: 8, unit: 'g' }, { name: 'Beurre fondu', quantity: 30, unit: 'g' }, { name: 'Huile pour la poêle', note: 'Un peu, si nécessaire' }],
    steps: ['Mélangez la farine, le sucre et la levure dans un saladier.', 'Fouettez les œufs avec le lait et le beurre fondu. Versez sur les ingrédients secs et mélangez sans insister.', 'Chauffez une poêle légèrement huilée à feu moyen. Versez de petites louches de pâte.', 'Quand des bulles apparaissent, retournez les pancakes et poursuivez la cuisson environ une minute. Répétez avec le reste de pâte.'],
    tip: 'Quelques petits grumeaux sont normaux : trop mélanger rend les pancakes moins moelleux.',
  },
  {
    id: 'mousse-chocolat', title: 'Mousse au chocolat', category: 'Desserts', origin: 'France',
    description: 'Trois ingrédients pour une mousse intense et aérienne. Le dessert à préparer tranquillement à l’avance.',
    minutes: 195, prep: 15, portions: 4, image: 'photo-1578985545062-69928b1d9587', tags: ['Végétarien', 'À préparer à l’avance'],
    ingredients: [{ name: 'Chocolat noir', quantity: 150, unit: 'g' }, { name: 'Œufs', quantity: 4 }, { name: 'Sel', note: 'Une pincée' }],
    steps: ['Faites fondre le chocolat au bain-marie, puis laissez-le tiédir.', 'Séparez les blancs des jaunes. Incorporez les jaunes au chocolat tiède.', 'Montez les blancs en neige avec une pincée de sel. Incorporez-les délicatement au chocolat en trois fois.', 'Répartissez dans des ramequins et placez au réfrigérateur pendant au moins 3 heures.'],
    tip: 'Le temps total inclut les 3 heures de repos au frais.',
  },
];

export const categories = ['Tout', 'Petit-déjeuner', 'Entrées', 'Plats', 'Desserts'];
export function normalizeSearch(value: string) { return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/œ/g, 'oe'); }
export function searchRecipes(query: string, category: string) {
  const words = normalizeSearch(query).trim().split(/\s+/).filter(Boolean);
  return recipes.filter(recipe => (category === 'Tout' || recipe.category === category) && words.every(word => normalizeSearch([recipe.title, recipe.origin, ...recipe.tags, ...recipe.ingredients.map(item => item.name)].join(' ')).includes(word)));
}
export function ingredientAmount(ingredient: Ingredient, portions: number, original: number) {
  if (ingredient.quantity === undefined) return ingredient.note ?? 'Selon le goût';
  return `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(ingredient.quantity * portions / original)}${ingredient.unit ? ` ${ingredient.unit}` : ''}`;
}
export function duration(minutes: number) { return minutes < 60 ? `${minutes} min` : `${Math.floor(minutes / 60)} h${minutes % 60 ? ` ${minutes % 60}` : ''}`; }
export function photo(recipe: Recipe) { return `https://images.unsplash.com/${recipe.image}?auto=format&fit=crop&w=1200&q=80`; }
