# Cuisine

Application mobile iOS et Android de découverte, création et partage de recettes. Le produit est construit avec React Native, Expo, TypeScript et Supabase.

Le projet est actuellement en phase de cadrage. Les spécifications fonctionnelles sont dans [.agent/instructions.md](.agent/instructions.md) et les coûts prévisionnels dans [.agent/tarification-mensuelle.md](.agent/tarification-mensuelle.md).

## Prérequis

Avant de démarrer le développement, prévoir :

- Node.js en version LTS et npm.
- Git.
- Un compte [Expo](https://expo.dev/).
- Un compte [Supabase](https://supabase.com/).
- Un téléphone iOS ou Android avec Expo Go pour les premiers essais. Pour un projet de production, utiliser ensuite une development build Expo.
- Un compte Google Play Console pour publier sur Android.
- Un compte Apple Developer Program pour publier sur iOS.

Un Mac est nécessaire pour utiliser le simulateur iOS localement. Il n'est pas nécessaire pour créer des builds iOS dans le cloud avec EAS Build.

## Initialiser l'application

L'application mobile n'a pas encore été générée. Lors de l'initialisation, créer le projet Expo avec le template par défaut, qui inclut TypeScript et Expo Router :

```bash
npx create-expo-app@latest cuisine-mobile --template default
cd cuisine-mobile
```

Puis installer les dépendances prévues :

```bash
npx expo install expo-secure-store expo-notifications expo-image-picker expo-sharing expo-print expo-dev-client
npm install @supabase/supabase-js @tanstack/react-query zustand
```

Le code de l'application devra ensuite être placé dans ce dépôt, avec les fichiers de configuration Expo, le dossier `app/` pour les écrans, le dossier `src/` pour la logique partagée et le dossier `supabase/` pour les migrations SQL.

## Configurer Supabase

1. Créer un projet dans le tableau de bord Supabase.
2. Dans la section Connect du projet, copier l'URL du projet et la publishable key.
3. Copier `.env.example` vers `.env`.
4. Renseigner les deux variables publiques Supabase.
5. Ne jamais ajouter `.env` au dépôt Git.
6. Activer Row Level Security sur toutes les tables avant de connecter l'application à des données réelles.

```bash
cp .env.example .env
```

La publishable key est destinée à être utilisée par l'application. Elle ne remplace pas les règles Row Level Security. La `SUPABASE_SERVICE_ROLE_KEY` est secrète : elle ne doit jamais être placée dans une variable `EXPO_PUBLIC_*`, dans l'application mobile ou dans Git. Elle est réservée à un serveur sécurisé ou à des Edge Functions Supabase.

## Variables d'environnement et clés

| Variable | Obligatoire | Emplacement | Rôle |
| --- | --- | --- | --- |
| `EXPO_PUBLIC_APP_ENV` | Oui | `.env` et EAS | Environnement `development`, `preview` ou `production`. |
| `EXPO_PUBLIC_SUPABASE_URL` | Oui | `.env` et EAS | URL du projet Supabase. |
| `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Oui | `.env` et EAS | Clé publique du client Supabase. |
| `EXPO_PUBLIC_SENTRY_DSN` | Non | `.env` et EAS | Suivi des erreurs, à ajouter si Sentry est choisi. |
| `SUPABASE_SERVICE_ROLE_KEY` | Seulement côté serveur | Secrets Supabase ou EAS | Opérations administratives sécurisées. |

Les services à configurer plus tard sont les suivants :

- Apple Developer et App Store Connect pour iOS.
- Google Play Console pour Android.
- EAS Build pour les signatures et builds des stores.
- Un fournisseur d'e-mails transactionnels, seulement si l'export et l'envoi de listes sont activés.
- Une source de données nutritionnelles, seulement pour le calcul automatique des macros. Sans source, le créateur pourra saisir les valeurs manuellement.

## Démarrer en développement

Installer les dépendances puis démarrer Expo :

```bash
npm install
npx expo start
```

Scanner le QR code avec Expo Go pour tester sur téléphone ou tablette. Les commandes suivantes seront aussi disponibles une fois le projet Expo initialisé :

```bash
npm run android
npm run ios
npm run web
```

Pour les fonctionnalités nécessitant du code natif, comme certaines notifications, utiliser une development build plutôt qu'Expo Go :

```bash
npx eas-cli@latest login
npx eas-cli@latest build:configure
npx expo install expo-dev-client
npx eas-cli@latest build --platform android --profile development
npx expo start --dev-client
```

## Tests et contrôle qualité

Les scripts de test seront ajoutés avec le code de l'application. La cible est :

```bash
npm run lint
npm test
npm run test:integration
```

Les parcours critiques seront testés avec Maestro sur émulateur ou appareil réel : inscription, recherche filtrée, création de recette, calcul ou saisie des macros, liste de courses et mode « Cuisiner en direct ».

## Construire et publier en production

Avant une première publication :

1. Créer les comptes Apple Developer et Google Play Console.
2. Définir les identifiants uniques de l'application dans la configuration Expo : `ios.bundleIdentifier` et `android.package`.
3. Configurer les profils `development`, `preview` et `production` dans `eas.json`.
4. Ajouter les variables publiques nécessaires dans les environnements EAS correspondants.
5. Vérifier les textes légaux, la politique de confidentialité, les captures d'écran et les icônes.

Vérifier le projet puis construire les versions pour les deux stores :

```bash
npm ci
npx expo-doctor
npx eas-cli@latest build --platform all --profile production
```

Après validation de la build, envoyer-la aux stores :

```bash
npx eas-cli@latest submit --platform all --latest
```

La soumission déclenche la revue Apple et Google ; elle ne rend pas l'application immédiatement publique. Tester d'abord la version iOS dans TestFlight et la version Android dans une piste de test interne ou fermée.

## Règles de sécurité

- Ne jamais publier de clé secrète, jeton, certificat ou fichier `.env`.
- Ne jamais utiliser la service role key dans l'application React Native.
- Appliquer Row Level Security à chaque table Supabase et vérifier les politiques avec des tests.
- Stocker les secrets de production uniquement dans Supabase Secrets ou EAS Environment Variables.
- Limiter le format et la taille des images téléversées.

## Documentation officielle

- [Créer un projet Expo](https://docs.expo.dev/more/create-expo/)
- [Configurer l'environnement Expo](https://docs.expo.dev/get-started/set-up-your-environment/)
- [Créer une build avec EAS](https://docs.expo.dev/build/setup/)
- [Démarrer avec Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs)
