# Cuisine — application mobile

Premier parcours de découverte de recettes, en français, développé avec Expo 57, React Native et Expo Router.

## Démarrer

```sh
npm install
npm start
```

La prévisualisation web est accessible à l’adresse indiquée par Expo (par défaut http://localhost:8081). Le serveur utilise la development build lorsque `expo-dev-client` est installé. Un appareil ou simulateur avec cette build est nécessaire pour tester le rendu natif.

## Fonctionnalités disponibles

- Accueil adaptable à la largeur de l’écran et recette du jour.
- Six recettes de démonstration, recherche par nom, ingrédient, origine et tags.
- Catégories cumulables avec la recherche, recherche insensible aux accents, état sans résultat et remise à zéro.
- Fiches accessibles directement via `/recette/<id>` avec ingrédients, étapes et conseils.
- Portions de 1 à 20, quantités recalculées et indications libres conservées.
- Ingrédients cochables pendant la consultation ; cet état reste temporaire.
- Retour vers l’accueil et gestion des identifiants inconnus.
- Favoris accessibles depuis les cartes, les fiches et l’écran `/favoris`.
- Liste de courses `/courses` : ajout depuis une recette avec les portions choisies, ajout manuel, modification, suppression et articles achetés.
- Regroupement des ingrédients non achetés de même nom, unité et indication ; les unités différentes restent séparées.
- Sauvegarde locale avec AsyncStorage sur mobile et le stockage du navigateur sur web. Les favoris et les courses restent disponibles à la réouverture sur le même appareil. Aucune synchronisation entre appareils.
- Une erreur de lecture bloque les modifications pour préserver les données ; une écriture échouée affiche un message et ne valide pas l’action.

Les recettes sont locales dans `src/data/recipes.ts`. Les photos Unsplash sont des illustrations distantes ; un libellé de remplacement s’affiche en cas d’échec de chargement. Aucune variable Supabase n’est nécessaire pour ce parcours.

Les comptes, la publication et les fonctions communautaires ne sont pas encore implémentés.

Après l’ajout du module natif AsyncStorage, reconstruire une development build existante avant de tester sur iOS ou Android. La prévisualisation web fonctionne sans cette étape.

## Vérifier

```sh
npm test
npm run lint
npx tsc --noEmit
npx expo export --platform all
```

Les 14 tests couvrent la recherche, la combinaison des filtres, les quantités, la cohérence du catalogue, le regroupement des courses et la sauvegarde (réouverture simulée, actions concurrentes et erreurs de lecture/écriture). L’export compile les bundles web, iOS et Android ; il ne remplace pas un test sur appareil.
