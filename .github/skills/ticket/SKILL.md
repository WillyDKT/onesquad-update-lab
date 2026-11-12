---
name: ticket
description: "Analyse le contexte OneSquad et rédige un ticket Bug ou Task clair, prêt pour Jira ou GitHub Issues. À utiliser pour créer, découper ou améliorer un ticket."
argument-hint: "Décris le besoin, le bug, ou donne un identifiant de tâche"
---

# Rédaction de tickets

Rédige des tickets concis et actionnables, utilisables dans Jira ou GitHub Issues. La structure est indépendante de l'outil de suivi. Pour le contexte durable OneSquad, conserve aussi la tâche correspondante dans `docs/project/tasks/` selon le workflow du dépôt.

## Étape 1 : analyser le contexte (obligatoire)

Avant de rédiger :

1. Lire le besoin fourni, la tâche ou la spec associée, puis suivre ses liens pertinents.
2. Si le ticket concerne un comportement existant ou un bug, inspecter le code, le fichier ouvert et les tests concernés afin de confirmer :
   - la page, la route ou le parcours utilisateur réel ;
   - les chemins exacts des composants, hooks, actions, types et utilitaires concernés ;
   - les appels API réels : méthode HTTP, endpoint et données échangées ;
   - les permissions, validations et états de chargement, vide, succès et erreur ;
   - les tests existants à mettre à jour.
3. Si une information manque, rechercher dans les fichiers pertinents avant de conclure qu'elle est inconnue.
4. Si le dépôt ne contient pas encore le code concerné, ne pas inventer de chemins, composants ou endpoints. Décrire le contexte produit connu et signaler les éléments techniques à confirmer.

Ne jamais inventer de noms de composants, routes, endpoints ou comportements. Ne pas proposer de modifier des fichiers générés : rechercher le code source qui les produit ou les utilise.

## Étape 2 : classifier le ticket

- Type `Bug` si le contexte décrit un comportement incorrect, une erreur, une exception ou une stack trace.
- Type `Task` dans les autres cas.
- Catégorie du titre :
  - `[Fonctionnel]` pour une fonctionnalité ou évolution métier ;
  - `[Technique]` pour du refactoring, de la dette technique ou une amélioration du code ou de l'infrastructure ;
  - `[Spike]` pour une étude ou une recherche de faisabilité.
- Pour un Bug, utiliser la catégorie qui décrit le travail correctif (`[Fonctionnel]` si le comportement utilisateur est en cause, sinon `[Technique]`).

## Étape 3 : rédiger le ticket

Rédiger en français, de façon concise.

### Titre

Format : `[Catégorie] Description courte en français`

Exemples : `[Fonctionnel] Ajouter un formulaire de contact` ; `[Technique] Corriger le calcul du total`.

### Description

Utiliser exactement les sections suivantes :

#### Contexte

Décrire la page, la route ou le parcours concerné, les fichiers réels pertinents et le comportement actuel. Référencer uniquement les chemins vérifiés.

#### Objectif

Décrire le résultat attendu côté utilisateur ou le résultat technique mesurable.

#### Travaux à réaliser

Lister les changements attendus sous forme de tâches. Ne pas prescrire un détail d'implémentation non confirmé.

#### Critères d'acceptation

Écrire des critères vérifiables, de préférence en « Étant donné / Quand / Alors ». Selon le besoin, couvrir :

- le parcours nominal et les cas d'erreur ;
- les états de chargement, de succès et d'absence de données ;
- les validations et permissions ;
- le responsive et le clavier lorsque pertinents ;
- les tests attendus.

### Autres champs

- Priorité : `Medium` par défaut ; changer uniquement si le contexte démontre une urgence.
- Ajouter les étiquettes, composant, projet, estimation ou autres champs du tracker seulement s'ils sont connus.

## Étape 4 : vérifier les informations manquantes

Avant de finaliser, vérifier que le titre, le type, le contexte, l'objectif et les critères d'acceptation sont compréhensibles. Si une information essentielle qui change le périmètre ou le comportement attendu manque, poser une question de clarification avant de créer le ticket. Ne pas bloquer sur un détail technique qui peut être découvert par l'équipe Dev : le noter comme point à confirmer.

## Étape 5 : créer ou remettre le ticket

- Si l'utilisateur demande une création dans Jira ou GitHub Issues, utiliser uniquement une intégration disponible dans la session et le projet cible explicitement identifié.
- Ne jamais prétendre avoir créé le ticket externe si aucune intégration de création n'est disponible ou si l'opération a échoué. Dans ce cas, fournir le ticket prêt à copier et expliquer brièvement la limite.
- Ne jamais deviner une clé de projet Jira, un dépôt ou un espace cible.
- Dans OneSquad, conserver le ticket externe dans l'epic `EPIC-XXXX` (et dans la sous-tâche concernée si nécessaire). Renseigner sa référence externe uniquement après création confirmée.

## Format de réponse

Indiquer le type, le titre, la priorité, puis la description dans les quatre sections ci-dessus. Terminer par le résultat de création : ticket créé avec sa référence/lien, ou ticket prêt à copier et raison pour laquelle il n'a pas été créé dans l'outil.
