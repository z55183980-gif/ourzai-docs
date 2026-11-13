---
id: codex-cli
title: Utiliser avec Codex CLI
sidebar_label: Codex CLI
description: Ajoutez ZAI comme fournisseur dans ~/.codex/config.toml pour que Codex CLI appelle l'API ZAI via le point de terminaison Responses.
sidebar_position: 3
update_docs: none
---

# Utiliser avec Codex CLI {#codex}

Codex appelle les modèles via le point de terminaison Responses : choisissez donc un modèle qui propose `responses`. Vérifiez-les dans [Catalogue et intégration des modèles](../models.md). Cette page concerne Codex en ligne de commande ; pour l'application de bureau Codex, voir [Application Codex](./codex-app.md).

:::tip Vous préférez éviter la configuration manuelle ?
ZAI propose un [outil de gestion des clés](./key-tool.md) pour ordinateur, qui regroupe vos clés API au même endroit et configure l'accès pour vous. [Accéder au téléchargement](./key-tool.md#download)
:::

## Ajouter le fournisseur {#config}

Ajoutez ce qui suit à `~/.codex/config.toml` (`%USERPROFILE%\.codex\config.toml` sous Windows) :

```toml
model = "<model ID that offers responses>"
model_provider = "zai"

[model_providers.zai]
name = "ZAI"
base_url = "https://api.ourzai.com/v1"
env_key = "ZAI_API_KEY"
wire_api = "responses"
```

`env_key` contient le nom d'une variable d'environnement, pas la clé elle-même : votre clé n'est donc pas stockée dans ce fichier.

## Définir la clé {#key}

Définissez la clé dans le terminal où vous lancez Codex, puis exécutez `codex` :

```bash
export ZAI_API_KEY="<your API key>"
codex
```

Dans Windows PowerShell, utilisez `$env:ZAI_API_KEY = "<your API key>"`. Pour la rendre permanente, ajoutez la ligne `export` à `~/.zshrc` ou `~/.bashrc` ; sous Windows, ajoutez une variable utilisateur nommée `ZAI_API_KEY` dans Propriétés système → Variables d'environnement, puis rouvrez le terminal.

Si les requêtes échouent après la configuration, recherchez le code d'état dans [Erreurs, limites et utilisation](../errors.md) : un 404 signale généralement un ID de modèle mal orthographié ou un modèle qui ne propose pas `responses`.
