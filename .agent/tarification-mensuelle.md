# Budget de mise en place et coûts mensuels

## Synthèse

Pour développer soi-même le MVP de l'application, il est possible de commencer gratuitement. Une fois l'application publiée, prévoir environ 30 à 50 EUR par mois pour une petite audience, plus les frais des stores à l'ouverture des comptes.

Ce budget ne comprend pas le temps de développement, la création de contenu culinaire, le marketing ni une rémunération de prestataire.

## Coûts mensuels

| Poste | Phase de développement | Après publication | Commentaire |
| --- | ---: | ---: | --- |
| Expo et EAS Build | 0 USD | 0 à 19 USD | L'offre gratuite convient au démarrage ; l'offre Starter est utile pour des builds prioritaires. |
| Supabase | 0 USD | 25 USD | L'offre gratuite convient aux prototypes ; l'offre Pro est recommandée pour une application en production. |
| Nom de domaine | 0 à 2 EUR | 1 à 2 EUR | Facultatif au début, mais recommandé pour un site vitrine et les e-mails. |
| E-mails transactionnels | 0 EUR | 0 à 15 EUR | Prévoir ce poste seulement si les volumes d'e-mails augmentent. |
| Outil de suivi des erreurs | 0 EUR | 0 à 20 EUR | Optionnel au lancement ; utile pour diagnostiquer les incidents. |
| Total estimé | 0 à 2 EUR | 30 à 50 EUR | Estimation hors dépassement de quotas et hors taxes. |

## Frais de publication à payer une fois ou chaque année

| Plateforme | Coût | Périodicité |
| --- | ---: | --- |
| Google Play Console | 25 USD | Une seule fois |
| Apple Developer Program | 99 USD | Chaque année |

Pour publier uniquement sur Android, le coût de démarrage est donc très faible. Pour publier sur Android et iOS, prévoir environ 120 EUR la première année pour les comptes développeur, selon le taux de change et les taxes applicables.

## Budget recommandé pour le lancement

| Scénario | Coût initial estimé | Coût mensuel estimé |
| --- | ---: | ---: |
| Prototype non publié | 0 à 20 EUR | 0 à 2 EUR |
| MVP Android et iOS, développé par toi | 120 à 250 EUR | 30 à 50 EUR |
| MVP avec un prestataire indépendant | 10 000 à 25 000 EUR | 30 à 100 EUR |
| Version plus complète avec communauté, modération et recommandations | 25 000 à 50 000 EUR ou plus | 50 à 300 EUR ou plus |

Les montants avec prestataire sont des ordres de grandeur. Ils dépendent surtout des maquettes, du niveau de finition, de la création de contenu initial, de l'administration des recettes et de la complexité des fonctions communautaires.

## Ce qui est inclus dans le MVP à faible coût

- Application React Native avec Expo pour iOS et Android.
- Authentification et profils via Supabase.
- Base de données PostgreSQL et stockage de photos via Supabase.
- Recherche, recettes, favoris et liste de courses.
- Publication sur les deux stores.

## Éléments qui font augmenter le budget

- Grand volume de photos, vidéos ou recettes.
- Notifications à forte fréquence.
- Export PDF et envoi massif d'e-mails.
- Modération humaine des recettes et commentaires.
- Système de paiement et abonnements.
- Campagnes publicitaires et création professionnelle de photos ou vidéos.
- Accompagnement juridique : politique de confidentialité, conditions d'utilisation et conformité RGPD.

## Recommandation de départ

1. Développer le MVP avec les offres gratuites d'Expo et Supabase.
2. Ouvrir les comptes Google Play et Apple seulement lorsque l'application est prête à être testée publiquement.
3. Passer Supabase en offre Pro au lancement, soit 25 USD par mois.
4. Garder Expo gratuit au départ ; passer à Starter, 19 USD par mois, seulement si le rythme de publication le justifie.
5. Prévoir une réserve mensuelle de 50 EUR pour absorber les petits coûts imprévus.

## Prix de vente et seuil de rentabilité

### Recommandation

Proposer une application gratuite avec une formule Premium à **3,99 EUR par mois**, plutôt qu'une application payante au téléchargement. La consultation de recettes doit rester accessible gratuitement ; les fonctions d'organisation avancées peuvent être réservées à Premium : listes illimitées, planification de repas, partage de listes et export PDF.

Ce positionnement est adapté à un lancement : il réduit la friction à l'installation et permet de vérifier l'intérêt avant de chercher à rentabiliser le temps de développement.

### Calcul pour un abonnement à 3,99 EUR par mois

Hypothèses pour une vente en France :

- Prix affiché : 3,99 EUR TTC.
- TVA : 20 %.
- Commission de store retenue pour le calcul : 15 %.
- Revenu net estimé par abonné et par mois : 3,99 / 1,20 x 0,85 = **environ 2,83 EUR**.

| Objectif | Nombre d'abonnés Premium nécessaires à 3,99 EUR par mois |
| --- | ---: |
| Couvrir 30 EUR de coûts mensuels | 11 abonnés |
| Couvrir 50 EUR de coûts mensuels | 18 abonnés |
| Couvrir 100 EUR de coûts mensuels | 36 abonnés |
| Générer 500 EUR par mois avant impôts et rémunération | 177 abonnés |

Ces calculs ne comprennent pas l'impôt sur les bénéfices, les remboursements, les frais de comptabilité ni les dépenses de marketing.

### Remboursement du coût de création

| Coût initial à rembourser | Abonnés Premium conservés 12 mois nécessaires, à 3,99 EUR par mois |
| --- | ---: |
| 250 EUR | 8 abonnés |
| 10 000 EUR | 295 abonnés |
| 25 000 EUR | 736 abonnés |

Le calcul suppose que chaque abonné reste 12 mois et que les coûts d'exploitation restent limités à 50 EUR par mois. En pratique, il faut viser davantage d'abonnés pour couvrir les résiliations et le marketing.

## Sources des tarifs techniques

- [Tarifs Expo Application Services](https://expo.dev/pricing) : offre gratuite, Starter à 19 USD par mois et crédits de build inclus.
- [Tarifs Supabase](https://supabase.com/pricing) : offre Pro à partir de 25 USD par mois ; l'offre gratuite est destinée aux prototypes et projets simples.
- [Apple Developer Program](https://developer.apple.com/programs/enroll/) : 99 USD par an, avec montant local affiché lors de l'inscription.
- [Inscription Google Play Console](https://support.google.com/googleplay/android-developer/answer/6112435) : frais uniques de 25 USD.
- [Programme Apple pour les petites entreprises](https://developer.apple.com/app-store/small-business-program/) : commission de 15 % pour les développeurs admissibles jusqu'à 1 million USD de produits annuels.
- [Frais de service Google Play](https://support.google.com/googleplay/android-developer/answer/112622?hl=fr) : les abonnements et les modalités applicables varient selon la région et le système de facturation ; le calcul utilise 15 % comme hypothèse prudente.
