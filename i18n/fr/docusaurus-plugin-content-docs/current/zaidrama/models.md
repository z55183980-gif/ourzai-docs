---
id: models
title: Modèles et capacités de ZaiDrama
description: Comment l'application créative ZaiDrama sélectionne les modèles en fonction de l'objectif pour chaque génération, et comment choisir les modèles, ajuster les paramètres et résoudre les problèmes de génération.
sidebar_position: 4
update_docs: engine-b
---

# Modèles et capacités de ZaiDrama {#providers}

Cette page explique comment choisir les modèles, comprendre leurs capacités et résoudre les problèmes de génération dans ZaiDrama. Pour appeler directement les modèles de la plateforme depuis votre propre application, consultez [Démarrage rapide de l'API](../api/quickstart.md).

Vous n'avez pas besoin de préparer de clés API tierces pour créer dans ZaiDrama. ZaiDrama sélectionne les modèles **en fonction de l'objectif** pour chaque appel, et vous ne faites des choix qu'à quelques endroits parmi les candidats proposés par la plateforme.

## 1. Sélection des modèles par objectif {#model-usages}

Chaque appel de modèle appartient à un objectif fixe :

| Catégorie | Objectif | Ce qu'il fait |
| --- | --- | --- |
| Texte | Tâches simples | Résumés de textes sources, analyse d'images de style, vérifications de cohérence |
| Texte | Tâches complexes | Scénarios, planification par lots, rédaction sur le canevas |
| Texte | Assistant du canevas | Zai agissant en votre nom dans le canevas créatif |
| Texte | Compréhension visuelle et audio du canevas | Zai du canevas visualisant des images, des vidéos et de l'audio dans les nœuds |
| Texte | Récupération web | Zai du canevas interrogeant le web lorsqu'il a besoin d'informations en temps réel |
| Image | Texte vers image | Images de personnages, images de scènes, images de storyboard et autres générations d'images à partir de texte uniquement |
| Image | Image vers image | Génération d'images avec des images de référence et retouche d'images |
| Vidéo | Image vers vidéo | Vidéos pilotées par les premières images du storyboard et les dispositions en grille |
| Vidéo | Référence vers vidéo | Génération de vidéos directement à partir d'images de référence de personnages, de scènes, d'accessoires ou de produits |
| Audio | Narration | Voix off de narration et aperçus de voix de personnages |

Lorsque vous utilisez la sélection par défaut, la plateforme choisit le modèle actuellement disponible pour l'objectif correspondant.

## 2. Où vous pouvez choisir les modèles {#user-model-selection}

| Emplacement | Ce que vous pouvez choisir |
| --- | --- |
| Infos du projet → Paramètres des épisodes → Mode Auto | Aucune sélection de modèle ; choisissez uniquement la « Qualité vidéo » (Rapide / Standard / Haute qualité) et le format d'image. La plateforme sélectionne les modèles selon le niveau de qualité |
| Infos du projet → Paramètres des épisodes → Mode Pro | Choisissez les modèles et les résolutions séparément pour l'image vers vidéo, la référence vers vidéo, le texte vers image et l'image vers image ; par défaut sur « Suivre le routage global » |
| Paramètres du projet → Voix off de narration | Modèle de narration par défaut, voix de narration et débit de parole |
| Canevas créatif → Panneau de génération du nœud | Le modèle utilisé pour cette génération |

- Les menus déroulants affichent les modèles actuellement disponibles pour cet objectif.
- Lorsqu'un modèle spécifié dans le projet est temporairement indisponible, l'interface affiche « Le modèle spécifié dans le projet est actuellement indisponible. » Vous pouvez revenir à « Suivre le routage global ».
- Le modèle de conversation de Zai et les autres objectifs de texte sont configurés par la plateforme ; les utilisateurs ne peuvent pas les choisir.
- La page personnelle « Paramètres » ne propose aucune option de modèle.

Pour votre première production, il est conseillé de valider le style et les résultats avec un petit nombre de clips avant d'élargir la portée.

## 3. Limites des capacités {#capability-boundaries}

La plateforme déclare les capacités pour chaque modèle spécifique, plutôt que de les déduire du fournisseur dans son ensemble. Voici les catégories de capacités ; celles qu'un modèle donné prend en charge dépendent des options réellement disponibles dans le panneau de génération et les menus déroulants :

- **Texte** : sortie structurée, compréhension d'images (entrée d'image) ;
- **Image** : texte vers image, image vers image (génération et retouche avec des images de référence), résolutions et formats d'image pris en charge ;
- **Vidéo** : image vers vidéo (pilotée par la première image, certains modèles prenant en charge les images de fin), référence vers vidéo (plusieurs images de référence, le nombre et le type variant selon le modèle), audio de référence, durée, résolutions et formats d'image pris en charge ;
- **Piste audio vidéo** : certains modèles vous permettent de choisir s'il faut générer une piste audio, d'autres produisent toujours du son, et d'autres sont toujours silencieux ;
- **Voix** : synthèse vocale et voix sélectionnables ; le débit de parole est ajusté dans les paramètres du projet ou les nœuds vocaux du canevas.

Les requêtes qui dépassent les capacités déclarées d'un modèle (par exemple, passer une image de fin à un modèle qui ne prend pas en charge les images de fin) sont explicitement rejetées avant la soumission, et ne sont jamais remplacées silencieusement par un modèle que vous n'avez pas choisi.

## 4. Frais et crédits {#credits-and-usage}

Les utilisateurs doivent consulter le solde disponible et le détail du solde dans « Facturation et solde » sous le menu du compte. La plateforme enregistre l'objectif, le modèle, le statut et le coût (en USD) de chaque génération ; chaque génération est facturée selon « tarif × utilisation », précis à 0,0001 $ près avec un minimum de 0,0001 $. Les résultats de facturation sont reflétés dans le détail du solde.

Si vous rencontrez un solde insuffisant ou des frais anormaux, notez le nom du projet et l'heure de l'incident, puis contactez le support en ligne via « Aide et commentaires ». Ne cliquez pas de manière répétée sur générer et ne tentez pas de contourner les vérifications de crédit.

## 5. Dépannage {#troubleshooting}

### Côté utilisateur {#user-troubleshooting}

- **Un modèle est absent du menu déroulant** : le modèle n'est pas proposé pour cet objectif, ou il est temporairement indisponible ;
- **Le modèle spécifié dans le projet est indisponible** : revenez à « Suivre le routage global » ou choisissez un autre candidat ;
- **Échec de la génération** : lisez d'abord la raison de l'échec indiquée sur la page de conversation ou de lot, et ne réessayez que les clips concernés ;
- **File d'attente trop longue** : les tâches sont planifiées uniformément par la plateforme ; ne soumettez pas à nouveau ;
- **Solde insuffisant** : vérifiez votre solde et le détail dans « Facturation et solde ».
