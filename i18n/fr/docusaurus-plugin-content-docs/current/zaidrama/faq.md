---
id: faq
title: FAQ ZaiDrama
description: Foire aux questions sur les comptes, l'avancement de la production, les reprises, le canevas, la voix off et les téléchargements dans l'application de création ZaiDrama.
sidebar_position: 5
update_docs: engine-b
---

# FAQ ZaiDrama {#faq}

Cet article couvre les questions les plus courantes concernant les comptes, la production et les téléchargements dans l'application de création ZaiDrama. Si c'est la première fois que vous l'utilisez, nous vous recommandons de commencer par le [Guide de démarrage ZaiDrama](./getting-started.md). Pour les comptes et soldes de la plateforme, consultez [Compte, solde et assistance](../platform/account.md).

## Quelles limites de capacités dois-je comprendre avant d'utiliser ZaiDrama ? {#capability-boundaries}

- La génération de médias est planifiée par la plateforme à travers les services de modèles en amont. La vitesse de génération, la disponibilité et les politiques de contenu peuvent évoluer selon l'état actuel des services.
- Zai fait avancer automatiquement la plupart des étapes, mais pour le contenu long, nous recommandons tout de même de vérifier le plan, les fiches de référence des personnages et les segments clés. ZaiDrama vise à améliorer les créateurs, pas à remplacer leur jugement.
- Différents modèles vidéo prennent en charge différentes limites concernant le nombre d'images de référence, la durée, les pistes audio et la résolution.
- Il suffit d'ouvrir le site Web et de se connecter pour commencer. Aucune installation de logiciel ni clé API tierce n'est requise.

## Inscription, connexion et compte {#install-deploy-update}

### Comment les utilisateurs classiques commencent-ils ? {#how-to-install}

Sur la page d'accueil, cliquez sur « Commencer à créer », inscrivez-vous ou connectez-vous avec un compte de plateforme unifié, puis accédez à la page d'accueil. Saisissez dans le champ de saisie la vidéo que vous souhaitez réaliser, ou joignez un roman, un script et des images de référence. L'envoi du premier message crée un projet et vous amène à la page du projet. Cette étape n'engendre aucun frais.

### Comment se connecter ? Que faire en cas d'oubli du mot de passe ? {#default-login}

- La boîte de dialogue de connexion prend en charge la connexion par e-mail ou nom d'utilisateur. Il n'y a pas de compte par défaut ; vous devez d'abord vous inscrire.
- Si vous oubliez votre mot de passe, cliquez sur « Mot de passe oublié ? » dans la boîte de dialogue de connexion et réinitialisez-le avec un code de vérification envoyé par e-mail.
- Si vous êtes déjà connecté et souhaitez changer de mot de passe, allez dans « Espace personnel » dans le menu du compte et cliquez sur « Changer le mot de passe ».
- En entrant depuis ourzai.com via « Espace de création », vous n'aurez pas besoin de ressaisir votre mot de passe si vous disposez déjà d'une session valide. ZaiDrama et la plateforme ZAI partagent le même compte.

Ne partagez jamais votre mot de passe ou votre code de vérification avec quiconque via le chat.

### Comment consulter les appareils connectés ou supprimer mon compte ? {#account-security}

Dans « Espace personnel », sous « Appareils connectés », vous pouvez voir tous les appareils connectés et cliquer sur « Se déconnecter » pour chaque appareil. « Supprimer le compte » se trouve également dans l'Espace personnel.

### Que faire si les pages de la plateforme ne s'ouvrent pas ou si les requêtes échouent ? {#page-request-failure}

Vérifiez d'abord votre connexion réseau et votre état de connexion, puis actualisez la page et réessayez. Si un seul projet ou une seule génération échoue, vérifiez la raison de l'échec indiquée dans la conversation ou sur la page des lots. En cas d'échecs persistants, contactez l'assistance en ligne via « Aide et commentaires » dans le menu du compte, en indiquant l'heure et la page où le problème est survenu. Si nécessaire, téléchargez les journaux de diagnostic depuis « Paramètres → Journaux de diagnostic » et envoyez-les à l'assistance. Ne téléversez pas de fichiers d'environnement et ne collez pas d'identifiants dans le chat.

### Comment la plateforme se met-elle à jour ? Vais-je perdre mes projets ? {#platform-updates}

Le site Web se met à jour automatiquement ; les utilisateurs n'ont pas besoin d'installer de correctifs. Pendant les mises à jour, les vidéos déjà soumises aux services de modèles continuent d'attendre leurs résultats. Un petit nombre de tâches d'image en cours peuvent être marquées comme interrompues et devront être régénérées. Les sorties terminées ne seront pas silencieusement écrasées par de nouvelles versions.

### Où sont stockés les projets ? Comment les sauvegarder ? {#where-is-data}

Les projets, les ressources et les résultats de génération sont stockés sur la plateforme. Nous vous recommandons de télécharger le contenu que vous souhaitez conserver à long terme. Vous pouvez télécharger à tout moment les vidéos terminées, les packages modifiables et l'audio de narration, mais la plateforme ne fournit pas d'export ZIP au niveau du projet. Les données de compte et de solde ne sont incluses dans aucun téléchargement.

### Que faire si le stockage est plein ? {#storage-full}

Dans le menu du compte, sous « Stockage », vérifiez la limite de capacité et l'utilisation par projet. Utilisez « Nettoyer l'historique » pour supprimer les versions historiques dont vous n'avez plus besoin (seules les versions historiques sont supprimées ; les versions actuellement utilisées sont conservées).

## Converser avec Zai {#setup-and-assistant}

### Quelles informations d'identification dois-je configurer avant de commencer la production ? {#required-credentials}

Aucune. Les utilisateurs classiques n'ont besoin que d'un compte de plateforme unifié. Les capacités de conversation, de texte/image/vidéo/voix et les ressources de tâches de Zai sont toutes fournies par la plateforme.

### Comment faire démarrer ou reprendre la production à Zai ? {#start-or-resume-assistant}

Énoncez simplement votre objectif directement dans la conversation Zai du projet, par exemple « Commencer la production » ou « Continuer à tourner le reste ». Zai examinera d'abord l'avancement actuel du projet et reprendra là où il s'était arrêté. Lorsqu'il a besoin de votre décision, il affiche une carte de question ou une carte de confirmation au-dessus du champ de saisie.

### Zai va-t-il dépenser de l'argent sans me demander ? {#assistant-spending}

Il ne dépassera pas le périmètre que vous approuvez :

- Avant le début du tournage, Zai vous donne un devis. Après avoir cliqué sur « Approuver et démarrer », les étapes comprises dans ce budget s'exécutent automatiquement sans autre interruption.
- Lorsque le budget de tournage est dépassé ou que le budget de reprise est insuffisant, une carte de confirmation apparaît à nouveau.
- Les actions sans coût, comme l'analyse du texte source, l'organisation du plan ou la rédaction de la première version du script, sont effectuées directement et vous sont signalées ensuite.
- Lorsque Zai souhaite écraser un contenu que vous avez modifié manuellement, il vous demande également votre consentement au préalable.

### Puis-je ne tourner qu'une partie d'abord ? {#partial-production}

Oui. Dites à Zai « Tourne d'abord l'épisode 1 » ou « Tourne seulement les deux premiers segments ». Le devis et le budget ne couvriront que ces segments, et les storyboards et vidéos suivants resteront dans ce périmètre. Une fois terminé, dites à Zai de continuer avec le reste.

### Si je modifie directement des éléments sur l'espace de travail, Zai le sait-il ? {#workbench-edits}

Oui. Lorsque vous ajoutez de nouveaux éléments à la bibliothèque de ressources, Zai les lit d'abord et vous demande comment vous souhaitez les utiliser. Des actions comme le changement de version ou la recomposition laissent une trace dans la conversation que Zai verra avant son prochain tour. Lorsque Zai souhaite écraser un contenu que vous avez modifié, il demande d'abord une confirmation, en listant chaque modification « ancien → nouveau » sur la carte.

### Que faire si Zai ne démarre pas ou si les requêtes expirent ? {#assistant-startup-failure}

Actualisez d'abord la page. Zai se reconnecte automatiquement en cas de perte de connexion, et le tour en cours ne sera pas interrompu. Si cela ne fonctionne toujours pas, notez l'heure et contactez l'assistance en ligne via « Aide et commentaires ».

## Modèles et fournisseurs {#providers-models-api}

### Quels modèles ZaiDrama prend-il en charge ? Puis-je les choisir moi-même ? {#supported-providers}

La plateforme sélectionne les modèles pour chaque invocation en fonction de la tâche (texte vers image, image vers vidéo, référence vers vidéo, narration, etc.). La plage disponible est indiquée sur la page produit. Vous pouvez choisir parmi les candidats disponibles de la plateforme dans les paramètres d'épisode (Mode Pro) sous « Infos projet », la voix off de narration dans les paramètres du projet, et le panneau de génération du canevas créatif. Le modèle de conversation de Zai ne peut pas être sélectionné. Voir [Modèles et capacités](./models.md).

### Puis-je utiliser mon propre fournisseur de modèles dans ZaiDrama ? {#custom-provider-setup}

Non. ZaiDrama fournit des modèles prêts à l'emploi et ne prend pas en charge l'ajout de vos propres fournisseurs de modèles.

- Pour appeler les modèles de la plateforme depuis votre propre programme : créez une clé API dans la console développeur et définissez base_url sur `https://api.ourzai.com/v1`. Voir le [Guide de démarrage rapide de l'API](../api/quickstart.md).
- L'option « Paramètres → Jetons API » de ZaiDrama crée des jetons permettant à des outils externes d'accéder à ZaiDrama lui-même, ce qui est différent des clés API de la console développeur.

### Que faire si la génération échoue ? {#auth-rate-limit-timeout}

Vérifiez d'abord la raison de l'échec : la carte de soumission dans la conversation et la page des lots indiquent toutes deux quels éléments ont échoué et pourquoi. La plateforme réessaie automatiquement lorsque les services en amont sont limités en débit ou temporairement indisponibles. Si les nouvelles tentatives ne suffisent pas, ne refaites que les segments concernés ; ne soumettez pas à nouveau tout le lot. Si un délai d'attente survient après la soumission, la tâche en amont a peut-être déjà été créée. Ne réessayez pas aveuglément en succession rapide : attendez un peu et vérifiez les résultats, puis contactez l'assistance si le problème persiste.

## Flux de travail du projet et production {#project-workflow-and-tasks}

### Dois-je d'abord choisir le mode narration, épisode ou publicité ? {#choose-mode-and-route}

Non. Les projets n'ont pas de mode de contenu ni d'itinéraire de génération verrouillé après la création. Zai décide du type de chaque segment (performance, narration, vitrine, etc.) et de la méthode de génération vidéo (guidée par storyboard ou guidée par référence) en fonction du matériel. Vous pouvez les mélanger dans le même épisode. Voir [Flux de travail de création](./workflows.md).

### Quels formats de fichiers sources sont pris en charge ? {#supported-source-formats}

- Fichiers : `.txt`, `.md`, `.docx`, `.epub`, `.pdf`. Chaque fichier doit faire moins de 50 Mo, jusqu'à 5 fichiers par pièce jointe.
- Images : PNG, JPG, WebP. Chaque image doit faire moins de 5 Mo, jusqu'à 5 images par pièce jointe.
- Vous pouvez joindre des fichiers et des images directement dans le champ de saisie de Zai sur la page d'accueil ou dans un projet. Vous pouvez également utiliser « Téléverser un fichier source » sur la page Scripts du projet.
- Coller un texte très long le réduit automatiquement en une carte « Texte collé », qui est enregistrée comme texte source lors de l'envoi.

Les PDF numérisés n'ont pas de texte extractible et nécessitent d'abord une OCR. Convertissez les anciens fichiers `.doc` en `.docx` avant de les téléverser.

### Où puis-je vérifier l'avancement de la production ? {#production-progress}

- L'étiquette d'état au centre de la barre supérieure, comme « Production en cours · Storyboards 8/11 » ou « Décision requise ».
- La progression en cinq étapes, « Décision requise » et « Dernières sorties » sur le tableau Kanban de l'espace de travail.
- La page Lots pour des aperçus lot par lot. Chaque segment indique le prompt envoyé au modèle vidéo et la raison de l'échec le cas échéant.

### Pourquoi la production est-elle bloquée ? {#stage-blocked}

Raisons courantes :

- Une étape attend votre confirmation (le Kanban indique « Une étape nécessite votre confirmation », avec la carte de confirmation au-dessus de la boîte de dialogue).
- Un personnage a plusieurs apparences, mais certains segments n'ont pas encore d'apparence sélectionnée.
- Certains segments d'une étape ont échoué et nécessitent que vous décidiez de réessayer ou de réviser.
- Le périmètre de tournage actuel est terminé ; pour continuer avec plus de contenu, dites-le à Zai.

### Comment mettre en pause, reprendre ou annuler la production ? {#task-states}

Dites-le simplement à Zai dans la conversation, par exemple « Pause », « Continue » ou « Annule cette production ». Après une annulation et une reprise, seules les parties annulées ou manquantes sont refaites ; les résultats terminés sont conservés et réutilisés.

### Que faire si je ne veux refaire qu'un seul segment ? {#reshoot-segment}

Dans la conversation, précisez quel segment et comment le modifier, par exemple « Rends-la plus froide dans le segment 3 ». Zai affiche une comparaison ancien → nouveau des modifications. Après votre confirmation, seule la vidéo de ce segment est refaite. Les reprises utilisent le budget de reprise, distinct du budget de tournage initial ; s'il est insuffisant, Zai demande à nouveau une confirmation.

### Comment empêcher qu'une version satisfaisante soit régénérée et remplacée ? {#pin-version}

Dans l'« Historique des versions » de cette ressource, cliquez sur « Verrouiller la version actuelle ». Une fois verrouillée, les résultats régénérés ne vont que dans les candidats de l'historique et ne remplacent pas automatiquement la version actuelle. Vous pouvez également cliquer sur « Passer à cette version » à tout moment pour revenir à un résultat antérieur.

## Visuels, vidéo et audio {#visuals-video-audio}

### Comment améliorer la cohérence des personnages ? {#character-consistency}

Confirmez d'abord la fiche de référence du personnage (une image contenant un gros plan tête-épaules ainsi que des vues complètes de face, de profil et de dos), puis générez les storyboards et les vidéos. La bibliothèque de ressources globale prend en charge la recherche et la réutilisation entre projets. Lorsqu'une définition de ressource change, les storyboards et vidéos existants ne sont pas silencieusement écrasés ; ils sont marqués comme antérieurs au contenu actuel, et vous décidez de refaire le tournage ou non.

### Que faire si un personnage change de tenue dans l'histoire ? {#character-looks}

Ajoutez une nouvelle **apparence** pour le personnage : dans les détails du personnage de la bibliothèque de ressources, cliquez sur « Ajouter une apparence », renseignez la coiffure, les vêtements et les accessoires, puis générez une fiche de référence (la fiche de référence de l'apparence principale est d'abord requise). Ensuite, dans le script, sélectionnez la tenue que ce personnage porte pour chaque segment. Les segments sans sélection s'arrêteront à l'étape du script. Vous pouvez également demander à Zai de rédiger les apparences et de remplir les sélections d'apparence pour les segments.

### Comment rendre les segments adjacents plus cohérents ? {#shot-continuity}

Verrouillez les personnages, les décors et les apparences avant de générer les vidéos. Gardez cohérents le lieu, l'heure, les vêtements et les descriptions des personnages. Les segments guidés par storyboard utilisent l'image du storyboard du segment précédent comme référence pour la continuité.

### Comment fonctionnent les premières et dernières images ? {#first-and-last-frame}

Dans les projets, les segments guidés par storyboard utilisent l'image du storyboard comme première image de la vidéo ; les dernières images ne sont pas utilisées. Pour contrôler à la fois les premières et dernières images, activez « Première/Dernière image » sur un nœud vidéo dans le [Canevas créatif](./canvas.md) (selon que le modèle sélectionné le prend en charge).

### Pourquoi des personnes apparaissent-elles dans les images de conception de décor ? {#people-in-scene-images}

Les images de conception de décor sont invitées à exclure les personnes, mais les modèles d'image peuvent ne pas s'y conformer entièrement. Vous pouvez régénérer l'image du décor ou utiliser l'édition d'image pour supprimer les personnes.

### ZaiDrama prend-il en charge la voix off ? {#voice-over-support}

- **Les dialogues** sont prononcés directement par le modèle vidéo.
- **La narration** est choisie dans les paramètres d'épisode sous « Infos projet » : doublage en post-production (par défaut, la vidéo finale exclut la voix de narration) ou doublage TTS (narration synthétisée par la plateforme). Le modèle de doublage, la voix et la vitesse sont ajustés dans les paramètres du projet sous « Voix off de narration ».
- Le lecteur de segment de narration permet de basculer entre « Vidéo originale » et « Superposition TTS ».

### Puis-je ajuster le style des sous-titres ? {#subtitle-style}

Oui. Dans « Infos projet → Style des sous-titres », ajustez la taille de police, la position verticale, la couleur et la police. L'aperçu montre exactement ce qui sera incrusté dans la vidéo finale, avec effet à partir de la composition suivante.

## Canevas créatif {#creative-canvas}

### Qu'est-ce que le Canevas créatif ? En quoi diffère-t-il des projets ? {#canvas-vs-project}

Le Canevas créatif est votre canevas personnel libre où vous placez texte, images, vidéo et audio sous forme de nœuds et générez directement dessus. Il n'est pas lié à un projet et ne comporte ni script, ni lots, ni livraison de vidéo finale. Utilisez les projets pour tourner un drame complet à plusieurs épisodes ; utilisez le canevas pour expérimenter librement des visuels ou créer des segments vidéo autonomes. Les deux partagent des ressources via la bibliothèque de ressources globale. Voir [Canevas créatif](./canvas.md).

### Zai dépensera-t-il directement de l'argent dans le canevas ? {#canvas-approval}

Pas par défaut : lorsque Zai s'apprête à dépenser de l'argent pour une génération, une barre d'approbation apparaît, indiquant le coût estimé en USD et votre solde, pour que vous confirmiez. Vous pouvez changer le mode d'approbation en « Générer directement », ou cocher « Confirmer automatiquement le reste de ce tour » sur la barre d'approbation pour ignorer la confirmation image par image pour le reste de ce tour, jusqu'à une limite cumulée de 0,20 $. Les actions irréversibles comme la suppression de nœuds ou l'effacement du canevas nécessitent toujours une confirmation.

### Puis-je partager ou sauvegarder le canevas ? {#canvas-share-export}

- « Partager » génère un lien en lecture seule que d'autres peuvent consulter sans se connecter. Vous pouvez le révoquer à tout moment.
- Le canevas peut être exporté sous forme de zip et importé depuis un zip.
- L'« Historique des versions » vous permet de prévisualiser, nommer, restaurer des instantanés ou enregistrer sous un nouveau canevas.

## Coût, données et téléchargements {#cost-data-export}

### Où puis-je vérifier mon solde et mes dépenses ? {#view-and-control-cost}

Le badge de solde dans la barre supérieure indique votre solde actuel en USD ; cliquez dessus pour voir le détail de l'utilisation. Le menu du compte « Facturation et solde » indique le solde disponible, le montant gelé, le détail du solde et l'historique des achats ; vous pouvez également y recharger votre compte. Le solde s'affiche avec 2 décimales (tronqué), tandis que chaque frais et les autres détails affichent 4 décimales. Les récompenses de connexion quotidienne et les récompenses de parrainage se trouvent dans le « Centre de récompenses ».

### Que puis-je télécharger ? {#project-zip-vs-full-backup}

- **Vidéo finale** : page Lots → vue « Révision » → « Vidéo d'épisode » → « Télécharger » pour cet épisode.
- **Package modifiable** : « Télécharger le package modifiable » dans le lecteur du segment vidéo. C'est un zip contenant la vidéo, l'audio de narration, les sous-titres (`.vtt` / `.srt`) et un fichier de description pour une édition ultérieure dans d'autres logiciels.
- **Audio de narration** : « Télécharger l'audio » dans l'historique des versions de la narration.

La plateforme ne fournit pas d'export ZIP d'un projet entier.

### Pourquoi le package modifiable manque-t-il des segments ? {#project-export-missing-clips}

Le package modifiable ne comprend que le contenu généré avec succès. Pour les segments manquants, vérifiez la raison de l'échec sur la page des lots, refaites ou régénérez, puis téléchargez à nouveau.

### Existe-t-il une application mobile ? {#mobile-app-support}

ZaiDrama est une application Web sans application native autonome iOS ou Android pour le moment. Les téléphones peuvent y accéder via un navigateur, mais la consultation des lots et l'édition du canevas sont mieux adaptées à un ordinateur de bureau.

### Puis-je l'utiliser à des fins commerciales ou construire dessus ? {#commercial-use}

Le code source de ZaiDrama est publié sous licence AGPL-3.0. Voir le dépôt source sur [GitHub](https://github.com/z55183980-gif/zaidrama).

## Bonnes pratiques de qualité et de coût {#quality-and-cost-best-practices}

1. Tournez d'abord quelques segments pour valider le style artistique, les personnages et le rythme avant de passer à l'échelle supérieure.
2. Finalisez les fiches de référence des personnages et les apparences avant de générer en lot les storyboards et les vidéos.
3. Gardez cohérents le lieu, l'heure, les vêtements et les descriptions des personnages entre les segments adjacents.
4. Ne référencez que les ressources dont le segment actuel a réellement besoin ; trop d'images de référence diluent les contraintes.
5. Si un seul segment pose problème, ne refaites que ce segment ; verrouillez rapidement les versions satisfaisantes.
6. Planifiez le périmètre de production en fonction du solde et des détails dans « Facturation et solde ».
