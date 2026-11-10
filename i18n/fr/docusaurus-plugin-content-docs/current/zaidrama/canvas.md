---
id: canvas
title: "Canevas créatif"
description: "La canevas créatif ZaiDrama : génération sur les nœuds, Zai sur la toile, confirmation avant génération, historique des versions et partage."
sidebar_position: 3
update_docs: engine-b
---

# Canevas créatif {#canvas}

La Canevas créatif est une toile infinie où vous pouvez librement organiser des idées, des références et des résultats générés. Vous pouvez générer des images, des vidéos, du texte et de la parole directement sur des nœuds, transmettre une image au nœud suivant pour poursuivre le travail, ou demander à Zai sur la toile de modifier des images et de créer des vidéos pour vous. Elle est particulièrement adaptée pour tester des styles, créer des concept arts, peaufiner un plan unique ou réaliser une courte vidéo ne nécessitant pas de script complet.

## 1. Relation entre les toiles et les projets {#canvas-and-projects}

- Une toile vous appartient personnellement et n’est rattachée à aucun projet ; les projets ne lisent pas non plus le contenu des toiles.
- Une toile n’est pas un second pipeline de production : elle ne comporte ni script, ni lots, ni livraison de montage final, et ses résultats générés n’entrent pas automatiquement dans un projet.
- Les deux se connectent via la **bibliothèque de ressources globale** : les images d’une toile peuvent être envoyées avec « Enregistrer dans la bibliothèque de ressources », et un projet les réutilise avec « Depuis la bibliothèque » sur sa page Bibliothèque de ressources ; l’onglet « Ressources » dans la barre latérale de la toile peut également placer du contenu de la bibliothèque de ressources sur la toile.

Utilisez un projet lorsque vous devez tourner une histoire complète sous forme de mini-série en plusieurs épisodes ; utilisez une toile lorsque vous souhaitez d’abord expérimenter librement avec des visuels, ou simplement créer quelques vidéos autonomes.

## 2. Création et gestion des toiles {#manage-canvases}

Cliquez sur « Canevas créatif » dans la barre latérale pour ouvrir la liste des toiles. La première fois que vous arrivez sans aucune toile, une toile vierge s’ouvre directement.

La liste est regroupée en « Aujourd’hui / 7 derniers jours / Plus tôt », et chaque carte montre ce qui se trouve sur la toile. Dans la liste, vous pouvez :

- Rechercher des noms de toiles ou du contenu depuis la barre supérieure ;
- Créer une « Nouvelle toile », ou « Dupliquer » une toile existante ;
- « Importer » une toile au format zip, ou « Exporter » une toile au format zip (lorsqu’un paquet importé n’est pas reconnu, seuls ses médias sont importés) ;
- « Sélectionner » plusieurs toiles pour les exporter ou les supprimer en masse ;
- Renommer et supprimer des toiles.

Les toiles sont nommées automatiquement à partir de leur contenu : la première fois que du texte est placé sur une toile, elle est nommée d’après le premier nœud, et après que Zai a créé quelque chose sur la toile, elle est nommée d’après la demande de ce tour. Un nom que vous avez modifié vous-même n’est jamais écrasé. Une toile vierge que vous fermez sans rien faire est automatiquement supprimée et ne reste pas dans la liste.

Chaque toile s’ouvre dans un nouvel onglet du navigateur. Les toiles sont enregistrées automatiquement, et la barre supérieure affiche « Enregistré / Enregistrement… / Non enregistré » ; si la même toile est modifiée dans deux fenêtres en même temps et que les modifications entrent en conflit, vous êtes averti par « Conflits avec les modifications dans une autre fenêtre ».

## 3. Nœuds et connexions {#nodes}

La barre d’outils fournit :

- **Sélectionner / Main** : sélectionner des nœuds ou faire défiler la toile ;
- **Ajouter des nœuds** : Texte, Image, Vidéo, Audio ; plusieurs nœuds peuvent être placés dans un groupe ;
- **Téléverser des fichiers** : PNG, JPG, WEBP, MP4, WEBM, MP3, WAV ; images jusqu’à 20 Mo, vidéos jusqu’à 200 Mo, audio jusqu’à 30 Mo ;
- **Utiliser des ressources existantes** : choisir parmi les contenus que vous avez téléversés ou générés précédemment ;
- **Préréglages** : par exemple « Assistant scénario » et « Rotation de personnage », qui disposent en une seule fois un ensemble de nœuds couramment utilisés ;
- **Paramètres de la toile** : rapport hauteur/largeur par défaut, résolution d’image par défaut, style d’arrière-plan et « Effacer la toile ».

Une connexion entre nœuds représente une relation d’entrée : reliez un nœud image à un nœud vidéo, et il devient la première image ou la référence de la vidéo.

La barre latérale comporte trois onglets : « Toile », « Ressources » et « Invites ». « Invites » contient les collections publiques et votre propre bibliothèque d’invites « Mes invites ».

## 4. Génération sur les nœuds {#generate}

Sélectionnez un nœud pour ouvrir son panneau de génération :

| Générer | Paramètres |
| --- | --- |
| Générer une image | Modèle, résolution, nombre d’images, rapport hauteur/largeur, style ; lorsque le rapport hauteur/largeur est défini sur « Auto », le rapport le plus proche de la première image de référence est utilisé |
| Générer une vidéo | Connectez une image comme première image (la vidéo suit généralement sa forme) ; connectez-en deux ou plus et elles sont toutes intégrées comme références, utilisez `@` pour indiquer qui est qui, et la vidéo est produite au rapport hauteur/largeur sélectionné ; avec « Première et dernière image » activé, les deux premières images sont les images de début et de fin ; résolution, durée et génération ou non de l’audio |
| Écrire du texte | Quoi écrire |
| Parole | Voix, vitesse |

Une fois la génération terminée, les actions rapides sur le nœud vous permettent de continuer avec « Créer une vidéo », « Créer une image », « Ajouter une narration » ou « Plan suivant ».

Les nœuds image fournissent également des outils tels que décrire comme invite, recadrer, diviser, agrandir, restaurer, nouvel angle, saisir la première image / l’image actuelle / la dernière image d’une vidéo, et enregistrer dans la bibliothèque de ressources. Parmi ceux-ci, le recadrage, la division et l’agrandissement s’exécutent dans le navigateur et sont gratuits.

Les modèles de génération sélectionnables proviennent des candidats que la plateforme a ouverts pour chaque usage ; voir [Modèles et capacités](./models.md).

## 5. Zai sur la toile {#canvas-zai}

La fenêtre Zai dans le coin inférieur droit de la toile peut être déplacée et redimensionnée ; double-cliquez dessus pour la ramener dans le coin inférieur droit. Elle peut voir cette toile et peut également la modifier pour vous :

- **Portée** : lorsque des nœuds sont sélectionnés, elle travaille uniquement sur les « N sélectionnés » ; sinon, elle travaille sur la « Toile entière » ;
- **Consulter le contenu** : elle peut consulter les images, vidéos et fichiers audio des nœuds ;
- **Recherche web** : elle effectue des recherches sur le web lorsque nécessaire, et ce qu’elle récupère n’est utilisé que comme matériel de référence ;
- **Mémo** : Zai lit le mémo en haut du panneau à chaque tour, et vous comme Zai pouvez le modifier ; les paramètres par défaut de la toile tels que le rapport hauteur/largeur, le style et la résolution sont automatiquement reportés sur les nouvelles toiles, il n’est donc pas nécessaire de les écrire dans le mémo ;
- **Annuler ce tour** : annulez en un clic toutes les modifications apportées par Zai à la toile lors de ce tour.

La toile Zai ne présuppose pas que vous réalisez une mini-série ; écrire des histoires, créer des affiches et créer des images de produit fonctionnent également. Le modèle de discussion qu’elle utilise est configuré par la plateforme.

### 5.1 Confirmer avant de générer {#approval}

Lorsqu’une génération est payante, par défaut Zai affiche d’abord une barre d’approbation indiquant le coût estimé (en USD) et votre solde, et elle ne s’exécute qu’après que vous avez cliqué sur « Générer » ; cliquez sur « Voir sur la toile » pour voir d’abord quels nœuds elle a l’intention de modifier.

- Dans le paramètre d’approbation du panneau Zai, vous pouvez passer sur « Générer directement », après quoi Zai ne demande plus à chaque fois.
- Si vous cochez « Confirmer automatiquement le reste de ce tour » sur la barre d’approbation, les générations restantes de ce tour n’affichent plus de carte une par une tant qu’elles restent dans le plafond cumulé de 0,20 $ ; la génération qui dépasserait le plafond est confirmée comme d’habitude.
- Les actions irréversibles telles que la suppression de nœuds ou l’effacement de la toile nécessitent toujours une confirmation.

## 6. Historique {#history}

« Historique » dans la barre supérieure vous permet de prévisualiser, nommer ou restaurer des instantanés de la toile :

- La plateforme conserve automatiquement des versions périodiquement pendant que vous modifiez ; elle en conserve également une avant la suppression de contenu, avant la restauration d’une version et avant que Zai ne modifie la toile ;
- Les versions que vous créez avec « Enregistrer la version » et que vous nommez ne sont pas nettoyées automatiquement ;
- Vous pouvez « Restaurer cette version » ou « Enregistrer comme nouvelle toile ».

## 7. Partage {#share}

« Partager » dans la barre supérieure peut générer un **lien en lecture seule** : toute personne disposant du lien peut consulter cette toile sans se connecter, mais ne peut pas la modifier. Vous pouvez « Révoquer le lien » à tout moment, et le lien cesse de fonctionner immédiatement après sa révocation.
