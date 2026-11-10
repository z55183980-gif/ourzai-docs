---
id: quickstart
title: Démarrage rapide de l'API
description: Obtenez une clé API depuis la console, changez base_url en https://api.ourzai.com/v1, puis envoyez votre première requête.
sidebar_position: 1
update_docs: none
---

# Démarrage rapide de l'API {#quickstart}

Démarrer avec l'API ZAI se fait en trois étapes : obtenir une clé, changer base_url, puis envoyer une requête. L'API publique de ZAI est compatible avec le format d'interface OpenAI : le code SDK OpenAI ou HTTP existant peut appeler les modèles de la plateforme en modifiant simplement base_url et la clé API. Chat, image, vidéo et audio passent tous par le même point d'entrée, les frais étant déduits de votre solde USD en fonction de l'utilisation réelle.

| Élément | Valeur |
| --- | --- |
| base_url (SDK compatible OpenAI) | `https://api.ourzai.com/v1` |
| Authentification | En-tête de requête `Authorization: Bearer <YOUR_API_KEY>` |
| Clés et utilisation | [Console développeur](https://ourzai.com/console) |

## 1. Obtenir une clé {#get-key}

1. Ouvrez la [Console développeur](https://ourzai.com/console) et connectez-vous avec votre compte plateforme. Si vous n'avez pas encore de compte, vous pouvez vous inscrire directement sur la page de connexion ; voir [Compte, facturation et assistance](../platform/account.md#register).
2. Accédez à **Clés API** (API keys), cliquez sur **Nouvelle** (New), puis saisissez un nom.
3. Configurez si nécessaire :
   - **Durée de validité** (Validity period) : choisissez 7 jours, 30 jours, 90 jours ou une date personnalisée, jusqu'à 3650 jours. Si aucune limite de validité n'est activée, la clé reste valable indéfiniment.
   - **Limite de dépenses totale** (Total spending limit) : lorsqu'elle est activée, définissez le montant maximal en USD que cette clé peut consommer. Lorsqu'elle est désactivée, la clé n'a pas de plafond de dépenses propre, mais les requêtes restent limitées par le solde disponible du compte.
   - **Liste d'autorisation / de blocage d'IP** (IP allowlist / blocklist) : IP unique ou CIDR, jusqu'à 100 entrées par liste.
4. Après la création, un exemple d'utilisation s'affiche et peut être copié directement.

Les clés complètes sont masquées par défaut dans la console ; vous pouvez cliquer pour les afficher et les copier à tout moment. Une clé ressemble à `sk-` suivi d'une chaîne de caractères hexadécimaux. Sur la même page, vous pouvez par la suite désactiver, activer, modifier la durée de validité et la limite, ou supprimer la clé.

:::caution Conservez votre clé en lieu sûr
Une clé équivaut à une autorisation de dépense sur votre compte. Ne la placez jamais dans du code frontend, ne la committez pas dans un dépôt de code et ne la partagez pas avec des tiers. Si vous soupçonnez une fuite, désactivez-la ou supprimez-la immédiatement dans la console et créez-en une nouvelle.
:::

## 2. Modifier base_url {#set-base-url}

Remplacez l'adresse utilisée par le SDK compatible OpenAI ou la requête HTTP par `https://api.ourzai.com/v1`, puis choisissez un modèle prenant en charge le point de terminaison correspondant. Différents modèles peuvent prendre en charge différents paramètres.

- **Le `/v1` est obligatoire** : les SDK compatibles OpenAI ajoutent des chemins comme `/chat/completions` à base_url. L'absence de `/v1` entraînera une erreur 404.
- Lorsque vous utilisez le SDK Anthropic pour appeler `/v1/messages`, définissez base_url sur `https://api.ourzai.com` (le SDK ajoutera `/v1` lui-même).

## 3. Envoyer votre première requête {#first-request}

Choisissez d'abord un modèle compatible chat dans **Tarification** (Pricing) de la console, puis placez son nom dans le champ `model`.

### cURL {#curl}

```bash
curl https://api.ourzai.com/v1/chat/completions \
  -H "Authorization: Bearer $ZAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<MODEL_ID>",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

### Python {#python}

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.ourzai.com/v1",
    api_key="<YOUR_API_KEY>",
)

response = client.chat.completions.create(
    model="<MODEL_ID>",
    messages=[{"role": "user", "content": "Hello"}],
)
print(response.choices[0].message.content)
```

### Node.js {#nodejs}

```js
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.ourzai.com/v1",
  apiKey: process.env.ZAI_API_KEY,
});

const response = await client.chat.completions.create({
  model: "<MODEL_ID>",
  messages: [{ role: "user", content: "Hello" }],
});
console.log(response.choices[0].message.content);
```

### Utiliser des variables d'environnement {#env}

De nombreux outils lisent les variables d'environnement standard d'OpenAI, vous n'avez donc pas besoin de modifier le code après les avoir définies :

```bash
export OPENAI_BASE_URL="https://api.ourzai.com/v1"
export OPENAI_API_KEY="<YOUR_API_KEY>"
```

## 4. Sortie en streaming {#streaming}

Le point de terminaison chat prend en charge la sortie en streaming SSE. Ajoutez `"stream": true` au corps de la requête ; l'utilisation est identique à celle d'OpenAI. Si une erreur survient après le démarrage du flux, elle sera renvoyée sous forme d'événement SSE, et le client devra la gérer.

## 5. Quels modèles sont pris en charge et combien coûtent-ils {#models}

- **Tarification dans la console** (Pricing) : répertorie les modèles proposés par la plateforme, les points de terminaison pris en charge par chaque modèle (chat, embeddings, génération d'images, génération de vidéos, etc.), ainsi que le prix unitaire en USD (par million de jetons ou par unité de facturation), avec le base_url. C'est la source de référence.
- **`GET /v1/models`** : utilisez votre clé API pour récupérer la liste des modèles par programmation.

Placez le nom du modèle directement dans le champ `model` de la requête. Si un modèle ne prend pas en charge le point de terminaison que vous appelez, une erreur 404 sera renvoyée ; voir [Erreurs, limites et utilisation](./errors.md).

## 6. Consulter l'utilisation {#usage}

La page **Utilisation** (Usage) de la console vous permet de filtrer par période, clé et modèle pour afficher le nombre de requêtes, les jetons, le coût (USD), les tendances d'utilisation et la répartition par modèle. Vous pouvez également exporter le détail des appels au format CSV, avec une plage de requête allant jusqu'à 90 jours. La page **Clés API** (API keys) affiche les dépenses de chaque clé pour aujourd'hui et au total.

Les appels API et la création ZaiDrama partagent le même solde USD. Pour recharger, voir [Compte, facturation et assistance](../platform/account.md#credits).

## Étapes suivantes {#next-steps}

- [Points de terminaison et capacités](./endpoints.md) : tous les points de terminaison chat, image, audio, vidéo et autres.
- [Erreurs, limites et utilisation](./errors.md) : codes d'erreur, limites de requêtes et FAQ.

## Intégration par modèle {#model-guides}

[Catalogue et intégration des modèles](./models.md) — Choisissez un modèle pour consulter ses interfaces et des exemples complets. Utilisez son identifiant exact : les modèles d’un même fournisseur ne prennent pas nécessairement en charge les mêmes interfaces.
