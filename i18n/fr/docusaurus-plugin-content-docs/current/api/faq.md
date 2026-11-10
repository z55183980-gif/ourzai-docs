---
id: faq
title: FAQ de l'API
sidebar_label: FAQ
description: Questions fréquentes sur l'API développeur ZAI, notamment les régions où elle est disponible, le paiement, la facturation, les prix, les différences avec les API officielles et la configuration des outils de développement.
sidebar_position: 6
update_docs: none
---

# FAQ de l'API {#faq}

## Qu'est-ce que l'API ZAI ? {#what-is-it}

L'API développeur ZAI est une passerelle de modèles qui suit le format de l'API OpenAI. Avec une seule clé API et une seule base_url (`https://api.ourzai.com/v1`), vous pouvez appeler des modèles de chat, d'image, de voix et de vidéo de GPT, Claude, Grok et d'autres fournisseurs. Le code existant utilisant le SDK OpenAI ou HTTP n'a besoin que d'une nouvelle base_url et d'une nouvelle clé. Voir [Démarrage rapide de l'API](./quickstart.md).

## Puis-je l'utiliser à Hong Kong, à Taïwan ou dans d'autres régions ? {#regions}

Oui. L'API est proposée aux développeurs du monde entier. À Hong Kong, à Taïwan, en Asie du Sud-Est et ailleurs, vous pouvez vous inscrire, recharger votre solde et effectuer des appels directement ; toutes les requêtes sont envoyées à `https://api.ourzai.com`. Respectez les [Conditions d'utilisation](https://ourzai.com/legal/terms.html) et les lois du lieu où vous vous trouvez.

## Comment payer ? {#payment}

Achetez un pack de recharge sur la page « Top up » de la [console développeur](https://ourzai.com/console). Les paiements sont traités par Stripe, et la page de paiement affiche les moyens de paiement dont vous disposez. Les recharges sont créditées sous forme de solde en dollars américains, qui n'expire jamais. Voir [Crédits](../platform/account.md#credits).

## Comment suis-je facturé ? Y a-t-il un abonnement mensuel ? {#billing}

Il n'y a ni frais mensuels ni abonnement. Chaque appel est déduit de votre solde en dollars américains selon l'usage réel. L'unité de facturation dépend du type de modèle (par million de tokens ou par unité de facturation), et une tâche vidéo n'est facturée qu'une fois, uniquement lorsque la vidéo est générée avec succès. Voir [Facturation et utilisation](./errors.md#billing).

## Comment les prix se comparent-ils à ceux des API officielles ? {#price}

La page **Tarification** (Pricing) de la console indique le prix en dollars américains de chaque modèle ainsi que sa remise par rapport au prix public du fournisseur. Les prix évoluent ; la page affiche toujours les prix en vigueur.

## Quelle différence avec l'utilisation directe des API officielles d'OpenAI ou d'Anthropic ? {#vs-official}

- Une seule clé permet d'appeler les modèles de plusieurs fournisseurs, et l'usage comme la facturation de tous ces modèles se consultent dans une seule console.
- Les points de terminaison suivent le format OpenAI : les modèles de chat Claude peuvent donc aussi être appelés via `/v1/chat/completions`. Les modèles Claude qui proposent le point de terminaison natif `messages` peuvent aussi être utilisés directement avec le SDK Anthropic. Voir [Interfaces et fonctionnalités](./endpoints.md).
- Les ID de modèle sont propres à cette plateforme, et des modèles différents d'un même fournisseur ne proposent pas forcément les mêmes points de terminaison. Voir [Catalogue et intégration des modèles](./models.md).
- Lorsqu'un fournisseur en amont subit une panne ou une limitation de débit, les requêtes peuvent renvoyer 502/503 ; patientez et réessayez avec un délai croissant. Voir [5xx Service temporairement indisponible](./errors.md#status-5xx).

## Puis-je l'utiliser dans Cursor, Cline, Claude Code ou Codex ? {#tools}

Oui. Pour savoir où chaque outil attend la base_url, la clé et le modèle, voir [Utiliser avec les outils de développement](./tools.md).

## Qui contacter en cas de problème ? {#support}

Écrivez à support@ourzai.com en indiquant l'e-mail de votre compte, l'heure de l'erreur et le message d'erreur de la réponse. N'incluez pas votre clé API. Pour les autres moyens de contact, voir [Contact et assistance](../platform/account.md#support).
