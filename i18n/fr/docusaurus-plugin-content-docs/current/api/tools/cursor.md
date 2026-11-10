---
id: cursor
title: Utiliser avec Cursor
sidebar_label: Cursor
description: Saisissez votre clé API ZAI dans Cursor et remplacez l'URL de base OpenAI pour utiliser les modèles ZAI dans le chat et l'Agent.
sidebar_position: 5
update_docs: none
---

# Utiliser avec Cursor {#cursor}

Cursor appelle les modèles personnalisés via le point de terminaison `chat.completions` : tout modèle de chat convient. Trouvez les ID de modèles dans [Catalogue et intégration des modèles](../models.md).

## Configuration {#setup}

1. Ouvrez Cursor Settings → Models.
2. Sous API Keys, saisissez votre clé comme OpenAI API Key, activez **Override OpenAI Base URL** et saisissez `https://api.ourzai.com/v1`.
3. Ajoutez à la liste les ID des modèles que vous voulez utiliser et activez-les.

## Ce qui utilise votre clé {#scope}

Votre propre clé ne sert qu'aux modèles que vous choisissez dans le chat et l'Agent. Les fonctions intégrées de Cursor, comme la complétion Tab, restent assurées par le service de Cursor.

Si les requêtes échouent après la configuration, recherchez le code d'état dans [Erreurs, limites et utilisation](../errors.md) : un 401 signale généralement une clé erronée, un 404 un ID de modèle mal orthographié.
