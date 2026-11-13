---
id: claude-code
title: Utiliser avec Claude Code
sidebar_label: Claude Code
description: Connectez Claude Code en ligne de commande à l'API ZAI via le point de terminaison Anthropic Messages, avec des variables d'environnement ou settings.json.
sidebar_position: 1
update_docs: none
---

# Utiliser avec Claude Code {#claude-code}

Claude Code appelle les modèles via le point de terminaison Anthropic Messages : seuls les modèles qui proposent `messages` fonctionnent. Vérifiez-les dans [Catalogue et intégration des modèles](../models.md). Cette page concerne Claude Code en ligne de commande ; pour utiliser Code dans l'application de bureau Claude, voir [Claude Desktop](./claude-desktop.md).

:::tip Vous préférez éviter la configuration manuelle ?
ZAI propose un [outil de gestion des clés](./key-tool.mdx) pour ordinateur, qui regroupe vos clés API au même endroit et configure l'accès pour vous. [Accéder au téléchargement](./key-tool.mdx#download)
:::

## Variables d'environnement pour une session {#env}

Définissez ces variables d'environnement dans le terminal où vous lancez Claude Code :

```bash
export ANTHROPIC_BASE_URL="https://api.ourzai.com"
export ANTHROPIC_AUTH_TOKEN="<your API key>"
export ANTHROPIC_MODEL="<model ID that offers messages>"
export ANTHROPIC_DEFAULT_OPUS_MODEL="<the same model ID>"
export ANTHROPIC_DEFAULT_SONNET_MODEL="<the same model ID>"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="<the same model ID>"
claude
```

Dans Windows PowerShell, définissez les mêmes variables avec `$env:NAME = "value"`. Ces variables ne valent que pour le terminal en cours.

## Enregistrer les paramètres durablement {#settings}

Pour ne pas redéfinir les variables à chaque fois, placez-les dans le champ `env` de `~/.claude/settings.json` (`%USERPROFILE%\.claude\settings.json` sous Windows). Il suffit ensuite de lancer `claude` :

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.ourzai.com",
    "ANTHROPIC_AUTH_TOKEN": "<your API key>",
    "ANTHROPIC_MODEL": "<model ID that offers messages>",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "<the same model ID>",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "<the same model ID>",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "<the same model ID>"
  }
}
```

Ce fichier stocke votre clé en clair. Ne le versionnez pas dans un dépôt de code et ne le partagez pas.

## Remarques {#notes}

- N'ajoutez pas `/v1` à `ANTHROPIC_BASE_URL` : Claude Code ajoute lui-même `/v1/messages`.
- Par défaut, Claude Code utilise d'autres gammes de modèles pour les tâches d'arrière-plan et les sous-agents. Faites pointer les trois variables `ANTHROPIC_DEFAULT_*_MODEL` vers un modèle que la plateforme propose avec `messages`, afin qu'il ne demande jamais un modèle absent de la plateforme et ne reçoive pas de 404.
- Tapez `/status` dans Claude Code pour voir le point de terminaison et le modèle utilisés.

Si les requêtes échouent après la configuration, recherchez le code d'état dans [Erreurs, limites et utilisation](../errors.md).
