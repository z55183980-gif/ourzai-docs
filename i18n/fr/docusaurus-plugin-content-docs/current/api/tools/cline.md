---
id: cline
title: Utiliser avec Cline
sidebar_label: Cline
description: Choisissez le fournisseur OpenAI Compatible dans Cline et saisissez l'URL de base, la clé et l'ID de modèle de l'API ZAI.
sidebar_position: 6
update_docs: none
---

# Utiliser avec Cline {#cline}

Cline appelle les modèles via le point de terminaison `chat.completions` : tout modèle de chat convient. Trouvez les ID de modèles dans [Catalogue et intégration des modèles](../models.md).

## Configuration {#setup}

1. Ouvrez les paramètres de Cline et réglez « API Provider » sur **OpenAI Compatible**.
2. Réglez « Base URL » sur `https://api.ourzai.com/v1`.
3. Saisissez votre clé dans « API Key ».
4. Dans « Model ID », saisissez l'ID d'un modèle de chat qui prend en charge `chat.completions`.

Cline envoie de nombreuses requêtes d'affilée pour une seule tâche : pensez à fixer un plafond de dépenses sur la clé. Voir [Obtenir une clé](../quickstart.md#get-key). Si les requêtes échouent après la configuration, recherchez le code d'état dans [Erreurs, limites et utilisation](../errors.md).
