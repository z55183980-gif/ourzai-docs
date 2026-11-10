---
id: tools
title: Utiliser avec les outils de développement
sidebar_label: Outils de développement
description: Configurez la base_url, la clé et le modèle de l'API ZAI dans des outils de développement comme Cline, Cursor, Codex CLI et Claude Code.
sidebar_position: 5
update_docs: none
---

# Utiliser avec les outils de développement {#tools}

Tout outil de développement ou client qui accepte un point de terminaison personnalisé compatible OpenAI peut utiliser l'API ZAI. Chaque outil demande les trois mêmes paramètres :

| Paramètre | Valeur |
| --- | --- |
| Base URL | `https://api.ourzai.com/v1` |
| API Key | Une clé créée sur la page **Clés API** (API keys) de la [console développeur](https://ourzai.com/console) |
| Modèle | Un ID de modèle du [catalogue des modèles](./models.md), saisi tel quel |

Les interfaces des outils évoluent d'une version à l'autre. Les étapes ci-dessous indiquent le nom des paramètres dans chaque outil ; si vous ne trouvez pas l'un d'eux, renseignez les trois paramètres ci-dessus là où l'outil les demande. Un outil de développement peut envoyer de nombreuses requêtes pour une seule tâche, et chacune est déduite de votre solde selon l'usage : pensez à fixer un plafond de dépenses sur la clé. Voir [Obtenir une clé](./quickstart.md#get-key).

:::tip Vérifiez les points de terminaison proposés par un modèle
Tous les modèles de chat prennent en charge `chat.completions` ; seuls certains proposent aussi `responses` ou le point de terminaison Anthropic `messages`. Codex a besoin de `responses` et Claude Code de `messages`. Avant de choisir un modèle, consultez ses points de terminaison dans [Catalogue et intégration des modèles](./models.md).
:::

## Cline {#cline}

1. Ouvrez les paramètres de Cline et réglez « API Provider » sur **OpenAI Compatible**.
2. Dans « Base URL », saisissez `https://api.ourzai.com/v1`.
3. Saisissez votre clé dans « API Key ».
4. Dans « Model ID », saisissez l'ID d'un modèle de chat qui prend en charge `chat.completions`.

## Cursor {#cursor}

1. Ouvrez Cursor Settings → Models.
2. Sous API Keys, saisissez votre clé comme OpenAI API Key, activez **Override OpenAI Base URL** et saisissez `https://api.ourzai.com/v1`.
3. Ajoutez à la liste des modèles les ID que vous souhaitez utiliser, puis activez-les.

Votre propre clé ne sert qu'aux modèles que vous choisissez dans le chat et l'Agent. Les fonctions intégrées de Cursor, comme la complétion Tab, restent assurées par le service de Cursor.

## Codex CLI {#codex}

Codex appelle les modèles via le point de terminaison Responses : choisissez donc un modèle qui propose `responses`. Ajoutez ceci à `~/.codex/config.toml` :

```toml
model = "<model ID that offers responses>"
model_provider = "zai"

[model_providers.zai]
name = "ZAI"
base_url = "https://api.ourzai.com/v1"
env_key = "ZAI_API_KEY"
wire_api = "responses"
```

Définissez ensuite la clé dans le terminal où vous lancez Codex :

```bash
export ZAI_API_KEY="<your API key>"
```

Dans Windows PowerShell, utilisez `$env:ZAI_API_KEY = "<your API key>"`.

## Claude Code {#claude-code}

Claude Code appelle les modèles via le point de terminaison Anthropic Messages : seuls les modèles qui proposent `messages` fonctionnent. Définissez ces variables d'environnement avant de le lancer :

```bash
export ANTHROPIC_BASE_URL="https://api.ourzai.com"
export ANTHROPIC_AUTH_TOKEN="<your API key>"
export ANTHROPIC_MODEL="<model ID that offers messages>"
export ANTHROPIC_DEFAULT_OPUS_MODEL="<the same model ID>"
export ANTHROPIC_DEFAULT_SONNET_MODEL="<the same model ID>"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="<the same model ID>"
claude
```

- N'ajoutez pas `/v1` à `ANTHROPIC_BASE_URL` : Claude Code ajoute lui-même `/v1/messages`.
- Par défaut, Claude Code utilise d'autres gammes de modèles pour les tâches d'arrière-plan et les sous-agents. Faites pointer les trois variables `ANTHROPIC_DEFAULT_*_MODEL` vers un modèle que la plateforme propose avec `messages`, afin qu'il ne demande jamais un modèle absent de la plateforme et ne reçoive pas de 404.
- Dans Windows PowerShell, définissez les mêmes variables avec `$env:NAME = "value"`.

## Autres clients compatibles OpenAI {#other-clients}

Dans des applications comme Chatbox, Cherry Studio, LobeChat, Open WebUI, Dify et n8n, ajoutez un fournisseur de type « compatible OpenAI » ou « OpenAI personnalisé » et renseignez les trois paramètres indiqués en haut de cette page. Pour les outils qui lisent les variables d'environnement standard d'OpenAI, voir [Utiliser des variables d'environnement](./quickstart.md#env).

Si les requêtes échouent après la configuration, recherchez le code d'état dans [Erreurs, limites et utilisation](./errors.md) : un 401 signale généralement une clé erronée, un 404 un ID de modèle mal orthographié ou un modèle qui ne prend pas en charge ce point de terminaison.
