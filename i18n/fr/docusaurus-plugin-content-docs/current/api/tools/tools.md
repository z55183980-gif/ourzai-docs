---
id: tools
slug: /api/tools
title: Utiliser avec les outils de développement
sidebar_label: Outils de développement
description: Paramètres communs pour utiliser l'API ZAI dans des outils de développement comme Claude Code, Claude Desktop, Codex, Cursor et Cline, avec un lien vers le guide de chaque outil.
sidebar_position: 0
update_docs: none
---

# Utiliser avec les outils de développement {#tools}

Tout outil de développement ou client qui accepte un point de terminaison personnalisé peut utiliser l'API ZAI. Chaque outil demande les trois mêmes paramètres :

| Paramètre | Valeur |
| --- | --- |
| Base URL | `https://api.ourzai.com/v1` (les outils qui utilisent le protocole Anthropic prennent `https://api.ourzai.com` ; voir la page de chaque outil) |
| API Key | Une clé créée sur la page **Clés API** (API keys) de la [console développeur](https://ourzai.com/console) |
| Modèle | Un ID de modèle du [catalogue des modèles](../models.md), saisi tel quel |

Les interfaces des outils évoluent d'une version à l'autre. La page de chaque outil indique le nom de ses paramètres ; si vous ne trouvez pas l'un d'eux, renseignez les trois paramètres ci-dessus là où l'outil les demande. Un outil de développement peut envoyer de nombreuses requêtes pour une seule tâche, et chacune est déduite de votre solde selon l'usage : pensez à fixer un plafond de dépenses sur la clé. Voir [Obtenir une clé](../quickstart.md#get-key).

:::tip Vérifiez les points de terminaison proposés par un modèle
Tous les modèles de chat prennent en charge `chat.completions` ; seuls certains proposent aussi `responses` ou le point de terminaison Anthropic `messages`. Avant de choisir un modèle, consultez ses points de terminaison dans [Catalogue et intégration des modèles](../models.md).
:::

## Choisir votre outil {#choose}

| Outil | Type | Point de terminaison requis | Guide |
| --- | --- | --- | --- |
| Claude Code | Ligne de commande | `messages` | [Claude Code](./claude-code.md) |
| Claude Desktop | Application de bureau (Chat, Cowork, Code) | `messages` | [Claude Desktop](./claude-desktop.md) |
| Codex CLI | Ligne de commande | `responses` | [Codex CLI](./codex-cli.md) |
| Application Codex | Application de bureau | `responses` | [Application Codex](./codex-app.md) |
| Cursor | Éditeur | `chat.completions` | [Cursor](./cursor.md) |
| Cline | Extension d'éditeur | `chat.completions` | [Cline](./cline.md) |

## Autres clients compatibles OpenAI {#other-clients}

Dans des applications comme Chatbox, Cherry Studio, LobeChat, Open WebUI, Dify et n8n, ajoutez un fournisseur de type « compatible OpenAI » ou « OpenAI personnalisé » et renseignez les trois paramètres indiqués en haut de cette page. Pour les outils qui lisent les variables d'environnement standard d'OpenAI, voir [Utiliser des variables d'environnement](../quickstart.md#env).

## En cas d'échec {#troubleshooting}

Recherchez le code d'état dans [Erreurs, limites et utilisation](../errors.md) : un 401 signale généralement une clé erronée, un 404 un ID de modèle mal orthographié ou un modèle qui ne prend pas en charge ce point de terminaison.
