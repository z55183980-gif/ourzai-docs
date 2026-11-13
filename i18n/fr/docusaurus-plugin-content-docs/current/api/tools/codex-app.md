---
id: codex-app
title: Utiliser avec l'application Codex
sidebar_label: Application Codex
description: L'application de bureau Codex partage config.toml avec Codex CLI. Ajoutez ZAI comme fournisseur et assurez-vous que l'application peut lire votre clé.
sidebar_position: 4
update_docs: none
---

# Utiliser avec l'application Codex {#codex-app}

L'application de bureau Codex lit le même fichier de configuration que Codex CLI et l'extension IDE : `~/.codex/config.toml` (`%USERPROFILE%\.codex\config.toml` sous Windows). Codex appelle les modèles via le point de terminaison Responses : choisissez donc un modèle qui propose `responses`. Vérifiez-les dans [Catalogue et intégration des modèles](../models.md).

:::tip Vous préférez éviter la configuration manuelle ?
ZAI propose un [outil de gestion des clés](./key-tool.mdx) pour ordinateur, qui regroupe vos clés API au même endroit et configure l'accès pour vous. [Accéder au téléchargement](./key-tool.mdx#download)
:::

## Ajouter le fournisseur {#config}

Ouvrez `config.toml` (les réglages de l'application permettent aussi d'ouvrir le fichier de configuration) et ajoutez ce qui suit au premier niveau du fichier :

```toml
model = "<model ID that offers responses>"
model_provider = "zai"

[model_providers.zai]
name = "ZAI"
base_url = "https://api.ourzai.com/v1"
env_key = "ZAI_API_KEY"
wire_api = "responses"
```

- Placez `model` et `model_provider` au premier niveau du fichier. L'application de bureau ne lit pas les réglages sous `[profiles]`.
- Si vous avez déjà configuré [Codex CLI](./codex-cli.md), inutile de les ajouter à nouveau.

## Rendre la clé accessible à l'application {#key}

`env_key` désigne la variable d'environnement `ZAI_API_KEY`. Une application de bureau ouverte depuis le Dock, le menu Démarrer ou le Launchpad ne lit pas les lignes `export` de `~/.zshrc`, de `~/.bashrc` ou de votre profil PowerShell : la variable doit donc être définie au niveau du système.

Sous macOS, exécutez dans le Terminal :

```bash
launchctl setenv ZAI_API_KEY "<your API key>"
```

Ce réglage est effacé au redémarrage de l'ordinateur ; exécutez-le de nouveau après un redémarrage.

Sous Windows, exécutez dans PowerShell (le réglage est permanent) :

```powershell
setx ZAI_API_KEY "<your API key>"
```

Quittez ensuite complètement l'application de bureau Codex (Commande + Q sous macOS ; sous Windows, vérifiez que l'application ne tourne plus en arrière-plan), puis rouvrez-la.

## Vérifier {#verify}

Créez une nouvelle tâche et envoyez un message. Si vous obtenez une réponse, la configuration fonctionne. Si l'application signale que `ZAI_API_KEY` est absente, elle n'a pas vu la variable à son lancement : vérifiez l'étape précédente, puis quittez complètement l'application et rouvrez-la. Pour les autres erreurs, recherchez le code d'état dans [Erreurs, limites et utilisation](../errors.md) : un 401 signale généralement une clé erronée, un 404 un ID de modèle mal orthographié ou un modèle qui ne propose pas `responses`.
