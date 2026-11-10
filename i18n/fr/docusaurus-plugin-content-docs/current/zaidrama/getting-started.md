---
id: getting-started
title: Tutoriel de démarrage de ZaiDrama
description: Le parcours complet dans ZaiDrama, d'une simple phrase à la finalisation d'un plan avec Zai, la confirmation de la production et la réception de la vidéo finale.
sidebar_position: 1
update_docs: engine-a
---

# Tutoriel de démarrage de ZaiDrama {#getting-started}

Ce tutoriel vous guide dans la création de votre premier court drama dans ZaiDrama (une application de création de courts dramas par IA, <https://zaidrama.com>) : à partir d'une simple phrase ou d'un script, vous affinez vos exigences en un plan avec Zai, confirmez le devis de production et recevez une vidéo finale téléchargeable. Ouvrez simplement le site web et connectez-vous : aucune installation de logiciel ni configuration de clé API tierce n'est nécessaire.

## Ce que vous allez accomplir {#what-you-will-build}

À l'issue de ce tutoriel, vous serez capable de :

1. Créer un compte et vous connecter à la plateforme unifiée ;
2. Démarrer un projet sur la page d'accueil avec une simple phrase, un extrait de roman ou un script, ou des images de référence ;
3. Élaborer un brief créatif, un modèle de monde et un plan de production avec Zai dans une seule conversation ;
4. Confirmer le devis de production et laisser Zai avancer par lots à travers les storyboards, les vidéos et le montage final ;
5. Suivre la progression sur le tableau et les pages de lots, et retourner localement tout segment qui ne vous satisfait pas ;
6. Prévisualiser et télécharger la vidéo finale et le package modifiable.

## Temps et coût estimés {#time-and-cost}

- L'envoi de votre premier message, la création du projet et la discussion du plan n'entraînent aucun frais ; seule la génération d'images, de vidéos et d'audio est déduite de votre solde (en USD).
- Le temps de génération vidéo dépend du nombre de segments, de la file d'attente de la plateforme et des modèles utilisés.
- Votre solde, les montants gelés et les détails de facturation sont disponibles sous « Facturation et solde » dans le menu du compte ; la carte de confirmation avant production indique clairement le coût de ce tournage.
- Pour votre premier essai, nous vous recommandons d'utiliser une petite quantité de contenu, ou de demander à Zai de « tourner d'abord les deux premiers segments » pour valider le style et les résultats avant d'élargir la portée.

## 1. Inscription et connexion {#create-account}

### 1.1 Inscription ou connexion {#sign-in}

Sur la page d'accueil, cliquez sur « Commencer à créer » ou « Connexion / Inscription » :

- **Connexion** : Saisissez votre e-mail ou nom d'utilisateur et votre mot de passe dans la fenêtre de connexion.
- **Inscription** : Sur la page « Créer votre compte ZAI », inscrivez-vous avec un code de vérification par e-mail ; le mot de passe doit comporter au moins 6 caractères et inclure des lettres et des chiffres.
- **Mot de passe oublié** : Cliquez sur « Mot de passe oublié ? » dans la fenêtre de connexion pour le réinitialiser avec un code de vérification par e-mail.
- **Entrer depuis la plateforme ZAI** : Sur ourzai.com, cliquez sur « Espace de création » pour entrer ; si vous disposez déjà d'une session de connexion valide, vous n'aurez pas besoin de ressaisir votre mot de passe.

ZaiDrama et la plateforme ZAI partagent le même compte : un compte créé sur le site officiel ou la console développeur permet donc une connexion directe. Si votre session expire ou si une vérification de sécurité est requise, suivez les instructions à l'écran pour vous reconnecter. Pour un guide complet sur les comptes et les soldes, consultez [Compte, solde et assistance](../platform/account.md).

### 1.2 Menu du compte {#account-services}

Le menu du compte dans le coin inférieur gauche de la barre latérale donne accès à :

| Entrée | Objectif |
| --- | --- |
| Profil | Avatar, pseudo, liaison e-mail, changement de mot de passe, appareils connectés, suppression du compte |
| Centre de récompenses | Récompenses de connexion quotidienne, récompenses de parrainage |
| Facturation et solde | Solde disponible, détails du solde, historique des achats, rechargement |
| Stockage | Capacité utilisée, utilisation par projet, nettoyage des versions historiques |
| Aide et commentaires | Assistance client en ligne |
| Paramètres | Apparence et langue, jetons API (pour que les outils externes accèdent à ZaiDrama ; distincts des clés API de la console développeur), à propos, journaux de diagnostic |

Le badge de solde dans la barre supérieure affiche votre solde actuel en USD ; cliquez dessus pour consulter les détails d'utilisation.

## 2. Démarrer un projet depuis la page d'accueil {#start-conversation}

### 2.1 Dites ce que vous voulez créer {#creative-intent}

Le titre de la page d'accueil demande : « Que voulez-vous transformer en vidéo aujourd'hui ? » Saisissez l'un des points de départ suivants dans la zone de saisie :

- Une idée d'histoire ou un objectif créatif unique ;
- Un extrait de roman, un script, un synopsis ou une présentation de produit ;
- Vos exigences concernant le style artistique, la durée, le format d'image ou le public cible.

Les entrées de démarrage rapide sous la zone de saisie peuvent vous aider à commencer : « Importer un roman / script » ouvre directement le sélecteur de fichiers ; « J'ai une idée », « Écrire un épisode d'une introduction de drama viral » et « Tourner une publicité pour un produit » remplissent simplement une invite d'une ligne dans la zone de saisie sans l'envoyer à votre place.

### 2.2 Joindre des documents {#source-intake}

Ajoutez des pièces jointes à l'aide du bouton trombone sur la zone de saisie, par glisser-déposer ou par collage :

- **Images** : PNG, JPG, WebP, jusqu'à 5 Mo par image, jusqu'à 5 images à la fois. Les images sont montrées à Zai et conviennent comme références pour les personnages, les scènes ou les produits.
- **Fichiers de roman / script** : `.txt`, `.md`, `.docx`, `.epub`, `.pdf`, jusqu'à 50 Mo par fichier, jusqu'à 5 fichiers à la fois. Après l'envoi, ils sont stockés comme texte source du projet.
- **Texte long collé** : Coller un long bloc de texte (environ 800 caractères ou 16 lignes ou plus) le réduit automatiquement en une carte « Texte collé », également stockée comme texte source et comptant pour un emplacement de fichier ; si vous ne le souhaitez pas, cliquez sur « Reconvertir en édition de corps de texte ».

Un seul message dans la zone de saisie est limité à 20 000 caractères ; joignez le contenu plus long sous forme de fichier. Les PDF numérisés ne contiennent pas de texte extractible et doivent d'abord être passés à l'OCR ; convertissez les anciens fichiers `.doc` en `.docx` avant de les importer.

### 2.3 L'envoi crée le projet {#create-project}

Lorsque vous envoyez votre premier message, ZaiDrama crée un projet et vous amène à la page du projet, où votre message et vos pièces jointes se poursuivent dans la conversation Zai au sein du projet. La page d'accueil ne stocke pas l'historique des discussions séparément ; chaque projet possède exactement une conversation Zai qui va des discussions de planification jusqu'à la vidéo finale. Le projet commence comme « Projet sans titre », et Zai le renomme après avoir lu le texte source.

## 3. Découvrir la page du projet {#project-workspace}

La page du projet est divisée en trois zones :

- **Zone principale : conversation Zai**. C'est ici que vous formulez des demandes, répondez aux questions et confirmez les devis ; Zai y rend compte de ce qu'il a fait à chaque étape.
- **Côté droit : établi**. Redimensionnable par glissement et repliable. Le « Tableau » est toujours épinglé à l'extrême gauche ; cliquez sur « + » pour ouvrir « Lots », « Documents », « Bibliothèque d'assets » et « Infos du projet ». Lorsque le projet comporte des produits, « Produits » apparaît également. Chaque page est un onglet fermable.
- **Côté gauche : aperçu de la progression de production**. Affiche l'étape actuelle parmi « Préproduction / Écriture du script / Préparation des assets / Production épisode par épisode / Livraison finale ».

Lors de votre première entrée dans un projet, l'établi ouvre automatiquement la page correspondant à l'étape actuelle de Zai ; ensuite, c'est à vous de choisir la page vers laquelle basculer. L'étiquette de statut au centre de la barre supérieure (par exemple, « Production · Storyboards 8/11 » ou « Décision requise ») vous ramène au tableau en un clic.

## 4. Finaliser le plan avec Zai {#confirm-project}

### 4.1 Révision du script et questions {#script-review}

Si vous avez fourni un roman ou un script, Zai le lit d'abord et effectue une révision du script : il identifie les épisodes manquants, les trous logiques, les personnages inactifs et les retournements non motivés (jusqu'à 5 éléments, chacun avec le texte original et une correction suggérée), puis vous demande si vous souhaitez apporter des modifications.

Lorsque Zai a besoin que vous preniez une décision, une carte de question apparaît au-dessus de la zone de saisie : les options peuvent être marquées « Recommandé », et vous pouvez les sélectionner avec les touches numériques ou appuyer sur Échap pour ignorer. Si aucune option ne convient, saisissez simplement votre réponse dans la zone de saisie : elle compte tout de même comme une réponse. Lorsque plusieurs questions sont posées en même temps, la carte comprend une option « Autre… » pour répondre individuellement à une question spécifique. Sélectionner une option comme « J'ai un script / roman » vous amène à la zone de saisie, où vous pouvez coller le texte ou cliquer sur + pour importer un fichier.

### 4.2 Le plan à trois niveaux {#choose-content-mode}

Zai organise vos exigences en un plan modifiable à trois niveaux :

- **Brief créatif** : Que créer, à qui cela s'adresse, où cela sera publié, quelle durée et quel ton utiliser ;
- **Modèle de monde** : Personnages (identité et apparence), scènes, accessoires, produits, style visuel et règles de continuité ;
- **Plan de production** : Découper l'œuvre en segments, chacun précisant le type, la durée, les personnages impliqués et la direction visuelle/audio.

Les projets ne nécessitent pas de choisir dès le départ un mode comme « court drama / narration / publicité », ni de sélectionner à l'avance une voie « storyboard / image de référence » : chaque segment décide de son propre parcours de production, et une même œuvre peut mélanger les approches. Après l'import d'un roman ou d'un script, Zai recommande également un style de projet (réaliste, drama BD 3D ou drama BD 2D), avec le réaliste par défaut.

Pour les actions non facturées comme l'organisation du plan, l'analyse du texte source et la rédaction de la première version du script, Zai les effectue simplement puis vous en informe. Il n'affiche une carte de confirmation que lorsqu'il doit écraser un contenu que vous avez personnellement modifié. Voir [Flux de travail créatifs](./workflows.md) pour plus de détails.

### 4.3 Adoption du plan et confirmation de production {#proposal-gate}

Une fois le plan esquissé, une bannière de confirmation apparaît au-dessus de la conversation :

- **Adopter le plan de production** : Lorsque le script ou les images d'assets ne sont pas encore prêts, adoptez d'abord le plan ; cette étape n'entraîne aucun frais.
- **Confirmation de production** : Le titre de la carte indique « La production coûtera $N » (USD). Cliquez sur « Voir les détails » pour consulter le nombre de segments, les secondes de vidéo, le nombre de storyboards, le nombre d'images de décor, ainsi que l'évolution du solde et les éléments non inclus (tels que les reprises). Après avoir cliqué sur « Approuver et démarrer la production », ce budget est alloué au projet en cours, et les étapes comprises dans ce budget se déroulent automatiquement sans vous interrompre une par une.

Vous pouvez ne tourner qu'une partie du projet : dites à Zai « tournez d'abord l'épisode un » ou « ne tournez que les deux premiers segments », et le devis et le budget ne couvriront que ces segments, tous les storyboards et vidéos suivants restant dans ce périmètre.

Si une carte de confirmation est affichée et que vous saisissez un nouveau message dans la zone de saisie, la carte est annulée et Zai recommence sur la base de vos nouvelles exigences.

## 5. Examiner les documents et les assets {#review-script-assets}

### 5.1 Documents {#script-documents}

La page « Documents » de l'établi répertorie les « Documents originaux » et les scripts groupés par « Lot N », chaque lot contenant la « Source du lot » et le « Script officiel ». Cliquez sur « Importer un fichier source » pour ajouter d'autres documents.

Ouvrez le script officiel pour voir le contenu de chaque segment. Lorsqu'un personnage possède plusieurs tenues, chaque segment doit en avoir une sélectionnée dans le menu déroulant « Tenue » ; les segments sans sélection affichent « Non sélectionné » et doivent être corrigés avant la génération du storyboard.

Les scripts sont rédigés directement par Zai et vous pouvez les examiner et les modifier à tout moment ; si Zai doit ultérieurement écraser un contenu que vous avez modifié, il vous demandera d'abord votre accord.

### 5.2 Personnages, scènes et accessoires {#asset-review}

La page « Bibliothèque d'assets » regroupe les éléments par personnages, scènes et accessoires, et vous permet de filtrer, d'ajouter de nouveaux éléments ou de réutiliser des assets inter-projets via « Sélectionner dans la bibliothèque d'assets » :

- **Images de référence des personnages** : Une par personnage, comprenant un gros plan tête et épaules ainsi que des vues de face, de profil et de dos en pied ; elles servent de point d'ancrage d'identité pour toutes les générations suivantes.
- **Tenues** : Un personnage peut avoir plusieurs tenues (cheveux, haut, bas, chaussures, accessoires). Les variantes au-delà de la tenue principale utilisent l'image de référence de la tenue principale comme point d'ancrage d'identité : l'image de référence de la tenue principale doit donc être générée en premier.
- **Voix** : Vous pouvez définir un audio de référence pour un personnage, ou générer un clip à l'aide de la synthèse vocale.
- **Historique des versions** : Les images d'assets, les storyboards et les vidéos prennent tous en charge « Basculer vers cette version » ; après « Verrouiller la version actuelle », les résultats régénérés vont uniquement dans les candidats historiques et ne remplacent pas la version actuelle.

Les entrées que vous ajoutez dans la bibliothèque d'assets sont automatiquement communiquées à Zai. Lorsque les définitions d'assets changent, les storyboards et vidéos déjà générés ne sont pas silencieusement écrasés ; ils sont plutôt marqués comme « antérieurs au contenu actuel », et c'est à vous de décider de les refaire ou non.

## 6. Suivre la production {#run-production}

### 6.1 Tableau et statut {#production-gates}

Une fois la production commencée, le « Tableau » devient le tableau de production :

- **Progression par poste** : Les cinq postes : Plan et script, Images de décor, Storyboards, Vidéos et Montage final ;
- **Décision requise** : Par exemple, une étape a dépassé son budget et attend une confirmation, ou un poste présente plusieurs éléments en échec ;
- **Dernière sortie** : Le contenu nouvellement généré porte un marqueur « Nouveau ».

Chaque étape de la conversation rend compte des résultats via une carte de soumission, telle que « Générer la vidéo · Terminé », « Utilisation du budget de production », « Temps écoulé … » ; les échecs partiels indiquent « M sur N ont échoué, le reste est terminé ».

### 6.2 Page des lots {#task-status}

La production se déroule par lots : une fois tous les storyboards et vidéos d'un lot terminés, elle passe au lot suivant. La barre de titre de la page « Lots » vous permet de basculer entre le lot précédent et le lot suivant, et propose deux vues :

- **Aperçu** (par défaut) : Lit ce lot en continu, avec le script de tournage qui défile ligne par ligne en synchronisation ; chaque segment vous permet d'inspecter l'invite envoyée au modèle vidéo, avec des pistes vidéo et audio distinctes en dessous. Les segments en échec indiquent la raison et proposent « Réessayer ».
- **Révision et édition** : La vidéo compilée de ce lot, le statut de production, les personnages du lot, les images de storyboard, la révision des candidats et les clips vidéo.

Pour mettre en pause, reprendre ou annuler la production, dites-le simplement à Zai dans la conversation. Les statuts de tâche comprennent : En file d'attente, En cours, Terminé, Échec, Annulé et Interrompu. Lorsque la plateforme redémarre, les vidéos déjà soumises aux services de modèles continuent d'attendre les résultats ; un petit nombre de tâches d'image en cours peuvent être marquées comme interrompues et doivent être régénérées individuellement.

### 6.3 Retournages locaux {#rerun-and-versions}

Lorsqu'un segment ne vous satisfait pas, indiquez clairement dans la conversation quel segment et ce qu'il faut modifier (par exemple, « rendez-la plus froide dans le segment 3 »). Zai fournit une comparaison ancien → nouveau ; après votre confirmation, seule la vidéo de ce segment est refaite.

- Les retournages et les révisions automatiques puisent dans un budget de reprise distinct et ne consomment pas le budget de production ; si le budget de reprise est insuffisant, une autre carte de confirmation apparaît.
- La sortie qui échoue à la validation automatique est automatiquement révisée ; si le même problème atteint la limite de révision, elle vous est remise pour décision.
- La « Révision des candidats » répertorie les versions candidates par score, avec les options « Sélectionner et verrouiller », « Rejeter », « Générer une autre » ou « Réviser selon la suggestion ».

Les modifications que vous apportez directement dans l'établi (comme changer de version ou recompiler) laissent une trace dans la conversation, afin que Zai en soit informé avant de parler ensuite.

## 7. Prévisualiser et télécharger {#preview-and-export}

La section « Vidéo compilée de ce lot » en haut de la vue « Révision et édition » de la page des lots fournit :

- Un aperçu de la vidéo compilée avec une bascule marche/arrêt pour « Sous-titres du montage final » ;
- « Télécharger » pour la vidéo finale ;
- « Historique des versions » pour consulter les montages compilés précédents, avec « Actuel » marquant la version en cours d'utilisation ;
- « Recompiler ».

Le lecteur de segment vidéo fournit :

- Pour les segments de narration, le basculement entre « Coupe audio originale » et « Superposition TTS » ;
- « Télécharger le package modifiable » : un zip contenant la vidéo, l'audio de narration, les sous-titres (`.vtt` / `.srt`) et un fichier de description, pour un montage ultérieur dans d'autres logiciels vidéo.

La taille, la position, la couleur et la police des sous-titres sont réglables sous « Infos du projet → Style des sous-titres » et prennent effet à partir de la prochaine compilation.

Nous vous recommandons de télécharger les vidéos finales et les documents que vous devez conserver à long terme.

## 8. Modèles et paramètres {#provider-boundary}

La section « Paramètres d'épisode » de la page « Infos du projet » propose deux modes :

- **Mode automatique** : Choisissez uniquement la « Qualité vidéo » (Rapide / Standard / Haute qualité) et le format d'image (Portrait 9:16 / Paysage 16:9) ; la plateforme décide du modèle.
- **Mode Pro** : Choisissez le modèle et la résolution par cas d'usage (image vers vidéo, référence vers vidéo, texte vers image, image vers image), avec la valeur par défaut « Suivre le routage global » ; vous pouvez également définir s'il faut générer de l'audio et le style du projet.

Les deux modes vous permettent de définir le mode de diffusion de la narration (voix off en post-production ou voix off TTS) et le style des sous-titres. L'élément « Paramètres du projet… » dans le menu du projet vous permet de modifier le style du projet ainsi que le modèle, la voix et la vitesse de la voix off de narration. Le modèle conversationnel utilisé par Zai est configuré par la plateforme et ne peut pas être sélectionné par les utilisateurs.

Les modèles sélectionnables proviennent uniquement des candidats actuellement ouverts sur la plateforme. Lorsqu'une capacité est indisponible, qu'une tâche échoue ou que la facturation semble incorrecte, vérifiez d'abord la raison de l'échec dans la conversation ; si le problème persiste, contactez l'assistance client en ligne via « Aide et commentaires ». Ne collez jamais de clé API ou de mot de passe dans la conversation.

## 9. Prochaines étapes {#next-steps}

- Lisez [Flux de travail créatifs](./workflows.md) pour en savoir plus sur les segments, les lots, la validation automatique et les points de confirmation ;
- Lisez [Toile créative](./canvas.md) pour expérimenter librement avec des images et des vidéos en dehors des projets ;
- Lisez [Modèles et capacités](./models.md) pour comprendre les limites de capacité de chaque cas d'usage ;
- Consultez la [FAQ](./faq.md) si vous rencontrez des problèmes de compte, de production ou de téléchargement.
