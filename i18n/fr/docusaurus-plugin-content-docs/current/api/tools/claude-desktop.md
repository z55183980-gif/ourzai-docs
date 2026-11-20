---
id: claude-desktop
title: Utiliser avec Claude Desktop
sidebar_label: Claude Desktop
description: Utilisez la configuration d'inférence tierce de l'application de bureau Claude pour que Chat, Cowork et Code passent par l'API ZAI.
sidebar_position: 2
update_docs: none
---

# Utiliser avec Claude Desktop {#claude-desktop}

L'application de bureau Claude (macOS et Windows) peut basculer vers l'API ZAI grâce à sa configuration d'inférence tierce. Une fois configurée, Chat, Cowork et Code envoient tous leurs requêtes à l'API ZAI via le point de terminaison Anthropic Messages, déduites de votre solde selon l'usage. Seuls les modèles qui proposent `messages` fonctionnent ; vérifiez-les dans [Catalogue et intégration des modèles](../models.md).

:::tip Vous préférez éviter la configuration manuelle ?
ZAI propose un [outil de gestion des clés](./key-tool.mdx) pour ordinateur, qui regroupe vos clés API au même endroit et configure l'accès pour vous. [Accéder au téléchargement](./key-tool.mdx#download)
:::

:::note Les variables d'environnement sont sans effet dans l'application de bureau
Les sessions Code locales de l'application de bureau utilisent un point de terminaison défini par l'application elle-même : `ANTHROPIC_BASE_URL` est ignorée, qu'elle soit définie dans un terminal, dans les variables d'environnement du système ou dans `~/.claude/settings.json`. Configurez plutôt l'application en suivant cette page. Pour la ligne de commande seule, voir [Claude Code](./claude-code.md).
:::

## Ouvrir la fenêtre de configuration {#open}

1. Mettez à jour l'application de bureau Claude vers la dernière version.
2. Activez le mode développeur : dans la barre de menus sous macOS, ou dans le menu de l'application (☰) en haut à gauche de l'écran de connexion sous Windows, choisissez **Help → Troubleshooting → Enable Developer Mode**.
3. Choisissez **Developer → Configure Third-Party Inference…** pour ouvrir la fenêtre de configuration.

Si le menu **Developer** n'apparaît pas, répétez l'étape 2. S'il n'apparaît toujours pas, votre version de l'application ne prend pas encore en charge l'inférence tierce ; mettez d'abord l'application à jour.

## Saisir les informations de connexion {#connection}

Dans la section **Connection** de la fenêtre de configuration, réglez **Inference provider** sur **Gateway**, puis renseignez :

| Paramètre | Valeur |
| --- | --- |
| Gateway base URL | `https://api.ourzai.com` (sans `/v1`) |
| Gateway API key | Votre clé API |
| Credential kind | **Static API key** |
| Gateway auth scheme | **Bearer** |

L'application ajoute elle-même `/v1/messages` et `/v1/models` à l'URL de base : n'ajoutez donc pas `/v1` ici.

Une fois les champs remplis, vous pouvez cliquer sur **Test connection** pour vérifier la connexion avant de continuer.

![Fenêtre d'inférence tierce de Claude Desktop : section Connection avec Gateway sélectionné et les informations de l'API ZAI renseignées](/img/tools/claude-desktop-gateway-light.png#light-only)
![Fenêtre d'inférence tierce de Claude Desktop : section Connection avec Gateway sélectionné et les informations de l'API ZAI renseignées](/img/tools/claude-desktop-gateway-dark.png#dark-only)

## Choisir les modèles {#models}

Lorsque la liste des modèles de la fenêtre de configuration est vide, l'application appelle `GET /v1/models` pour découvrir les modèles et ne place dans le sélecteur que les ID qu'elle reconnaît comme des modèles Claude. Les modèles Claude ajoutés plus tard par la plateforme apparaissent dans le sélecteur au prochain démarrage de l'application.

Dès que vous saisissez des ID dans la liste des modèles, l'application cesse de découvrir les modèles et le sélecteur n'affiche plus que ceux de la liste. Pour voir tous les modèles disponibles, videz la liste et appliquez la configuration. Ne remplissez la liste que pour limiter le sélecteur à quelques modèles ou si le modèle voulu manque, en saisissant tels quels des ID de modèles qui proposent `messages`.

## Appliquer la configuration {#apply}

Cliquez sur **Apply Changes**. L'application enregistre la configuration sur cet appareil et redémarre. Après le redémarrage, envoyez un message dans Chat, Cowork ou Code pour vérifier que vous obtenez une réponse. Les modifications ultérieures ne prennent effet, elles aussi, qu'une fois appliquées et l'application redémarrée.

Si le menu **Developer** a disparu lorsque vous voulez modifier à nouveau la configuration, réactivez le mode développeur comme à l'étape 2 d'[Ouvrir la fenêtre de configuration](#open).

## Dépannage {#faq}

- **Le sélecteur de modèles est vide** : vérifiez que la clé est correcte, ou ajoutez les ID de modèles manuellement comme décrit dans [Choisir les modèles](#models).
- **Le sélecteur n'affiche qu'une partie des modèles** : des ID ont été saisis dans la liste des modèles de la fenêtre de configuration, donc l'application n'affiche que ces modèles. Videz la liste pour réactiver la découverte, ou ajoutez-y les ID des modèles voulus.
- **401** : la Gateway API key est erronée, ou Gateway auth scheme n'est pas **Bearer**.
- **404 ou « modèle indisponible »** : l'ID de modèle est mal orthographié, ou le modèle ne propose pas le point de terminaison `messages`.

Pour les autres codes d'état, voir [Erreurs, limites et utilisation](../errors.md).
