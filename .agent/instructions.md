# Application mobile de cuisine

## Objectif

Créer une application mobile de cuisine destinée aux smartphones et tablettes. Elle permettra aux utilisateurs de découvrir des recettes, gérer leurs listes de courses et partager leurs créations avec une communauté.

L'application devra pouvoir être publiée sur l'App Store et le Google Play Store.

## Choix techniques retenus

- Application mobile : React Native avec Expo et TypeScript.
- Navigation : Expo Router.
- Données distantes et cache : TanStack Query.
- État local léger : Zustand, uniquement si nécessaire.
- Backend : Supabase.
- Base de données : PostgreSQL via Supabase.
- Authentification : Supabase Auth.
- Stockage des photos : Supabase Storage.
- Notifications : Expo Notifications.
- Génération et soumission des versions mobiles : EAS Build et EAS Submit.

Expo permet de développer une application iOS et Android à partir d'une base de code commune, puis de la tester facilement sur un appareil physique avec Expo Go. Le développement du code se fera sur ordinateur ; téléphone et tablette serviront aux tests réels.

## Fonctionnalités du MVP

1. Authentification et profil utilisateur.
   - Inscription, connexion et déconnexion.
   - Préférences alimentaires et informations de profil.
   - Réglages de confidentialité du profil et des recettes publiées.

2. Consultation et recherche de recettes.
   - Liste de recettes et fiche détaillée.
   - Recherche textuelle.
   - Filtres cumulables par ingrédient, durée, type de plat et régime alimentaire.
   - Filtres par pays et région culinaire : par exemple France, Italie, Maroc, Bretagne ou Sicile.
   - Filtres de préparation : moins de 15 minutes, moins de 30 minutes, cuisson rapide, cuisson longue, sans cuisson et préparation à l'avance.
   - Filtres nutritionnels : équilibré, léger, pauvre en matières grasses, riche en protéines, végétarien, végétalien, sans gluten et sans lactose.
   - Filtres par valeurs nutritionnelles : calories, protéines, glucides, lipides et fibres par portion.
   - Tri par popularité, note moyenne, nouveauté, temps de préparation et temps total.
   - Catégories éditoriales : petit-déjeuner, entrée, plat, dessert, apéritif, boisson, accompagnement et goûter.
   - Photos, ingrédients, étapes, temps de préparation, nombre de portions et conseils.
   - Affichage des informations nutritionnelles par portion : calories, protéines, glucides, lipides, acides gras saturés, sucres, fibres et sel.
   - Bouton « Cuisiner en direct » sur chaque fiche recette.
   - Mode de cuisine guidé, affichant une étape à la fois avec une action « Étape terminée » pour passer à la suivante.
   - Barre de progression, possibilité de revenir à une étape précédente et reprise de la recette en cours.
   - Minuteur intégré pour les étapes contenant une durée, avec alerte à la fin du temps prévu.
   - Sélecteur du nombre de personnes avant ou pendant la recette ; les quantités de chaque ingrédient sont recalculées automatiquement à partir du nombre de portions d'origine.
   - Les quantités non calculables automatiquement, telles que « une pincée » ou « selon le goût », restent affichées avec une indication adaptée.

3. Favoris et listes de courses.
   - Enregistrement de recettes favorites.
   - Ajout des ingrédients d'une recette à une liste de courses.
   - Modification manuelle, regroupement des ingrédients et coche des articles achetés.

4. Publication de recettes.
   - Création, modification et suppression de ses propres recettes.
   - Back-office de création sous forme de formulaire guidé, utilisable sur mobile et tablette.
   - Champs essentiels : nom de la recette, photo, description courte, pays ou région, catégorie, nombre de portions et temps de préparation.
   - Ajout d'ingrédients ligne par ligne : nom de l'ingrédient, quantité, unité et note facultative.
   - Unités proposées : gramme, kilogramme, millilitre, litre, cuillère à café, cuillère à soupe, tasse, pincée, pièce, livre et unité personnalisée.
   - Deux modes nutritionnels au choix du créateur : calcul automatique à partir des ingrédients ou saisie manuelle.
   - En mode automatique, calcul des apports nutritionnels de la recette et par portion lorsque les ingrédients possèdent des données nutritionnelles.
   - En mode manuel, saisie des calories, protéines, glucides, lipides, acides gras saturés, sucres, fibres et sel par portion.
   - Le créateur peut corriger les valeurs calculées, notamment lorsqu'un ingrédient n'est pas reconnu ou qu'une unité ne peut pas être convertie automatiquement.
   - Saisie du temps de cuisson, du temps de repos et du temps total.
   - Sélection des ustensiles nécessaires : par exemple four, casserole, poêle, robot, mixeur, plat ou moule.
   - Étapes de préparation numérotées, avec durée indicative et photo facultative pour chaque étape.
   - Aperçu de la recette avant publication et contrôles de validation des champs obligatoires.
   - Ajout de photos.
   - Brouillon et publication.

5. Communauté.
   - Notes et commentaires sur les recettes publiées.
   - Mentions « J'aime » sur les recettes et les commentaires.
   - Compteur de favoris, de mentions « J'aime », de commentaires et de préparations déclarées.
   - Possibilité d'indiquer qu'une recette a été réalisée et d'ajouter une photo ou un conseil personnel.
   - Réponses aux commentaires, avec notification de l'auteur concerné.
   - Profils publics de créateurs avec leurs recettes, favoris publics et statistiques simples.
   - Suivi d'autres créateurs et fil d'activité des comptes suivis.
   - Partage d'une recette par lien et vers les applications de partage installées sur l'appareil.
   - Signalement des contenus inappropriés.
   - Modération minimale des contenus signalés, avec possibilité de masquer ou supprimer un commentaire.

## Fonctionnalités après le MVP

- Export d'une liste de courses au format PDF.
- Envoi de la liste de courses par e-mail.
- Recommandations personnalisées.
- Notifications pour les mentions « J'aime », réponses aux commentaires, nouveaux abonnés et recettes enregistrées.
- Version web, si elle devient utile, via Expo Web.

## Exigences de qualité et de sécurité

- Interface responsive, utilisable au toucher sur smartphone et tablette.
- Validation des formulaires côté application et côté base de données.
- Règles Row Level Security de Supabase pour empêcher l'accès non autorisé aux données.
- Les utilisateurs ne peuvent modifier ou supprimer que leurs propres recettes, commentaires et listes.
- Les images doivent être limitées en format et en taille.
- Accessibilité : contrastes suffisants, tailles de texte lisibles et libellés explicites.
- Aucune donnée sensible ne doit être stockée dans l'application mobile.

## Plan de développement

1. Cadrage et conception.
   - Définir les parcours utilisateur et les maquettes mobile/tablette.
   - Définir le schéma de données : utilisateurs, recettes, ingrédients, étapes, favoris, listes, commentaires et signalements.
   - Définir les référentiels de catégories, pays, régions culinaires, régimes, attributs nutritionnels et durées de cuisson.
   - Définir le modèle nutritionnel : valeurs pour 100 grammes d'ingrédient, total de recette et valeurs par portion.
   - Configurer le projet Expo, TypeScript, Supabase et les environnements de développement.

2. Fondations techniques.
   - Configurer l'authentification, la navigation et la gestion de session.
   - Créer les migrations PostgreSQL, les politiques Row Level Security et le stockage des images.
   - Mettre en place le design system minimal et les composants partagés.

3. Développement du MVP.
   - Développer les écrans de recettes, recherche et filtres.
   - Développer les favoris et les listes de courses.
   - Développer la création de recettes et l'ajout de photos.
   - Développer les interactions communautaires : notes, mentions « J'aime », commentaires, réponses, suivi et signalements.

4. Tests.
   - Tests unitaires avec Jest et React Native Testing Library pour les composants, validations et logique métier.
   - Tests d'intégration avec Jest et le client Supabase pour les flux d'authentification, recettes et listes de courses.
   - Tests de parcours critiques sur appareil ou émulateur avec Maestro : inscription, recherche, ajout à une liste et publication d'une recette.
   - Vérification manuelle sur plusieurs tailles de smartphones et de tablettes.

5. Livraison.
   - Mettre en place l'intégration continue pour lancer les tests à chaque modification.
   - Générer les builds iOS et Android avec EAS Build.
   - Préparer les icônes, captures d'écran, politique de confidentialité et fiches des stores.
   - Publier avec EAS Submit après validation sur appareils réels.

## Décisions à confirmer

- Lancement uniquement en français ou multilingue dès la première version.
- Source des premières recettes : contenu éditorial, recettes de la communauté ou API externe.
- Règles de modération et personnes responsables de leur application.
- Priorité entre la dimension communautaire et les listes de courses.
- Besoin réel d'une version web après le lancement mobile.
