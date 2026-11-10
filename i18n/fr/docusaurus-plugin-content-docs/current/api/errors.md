---
id: errors
title: Erreurs, limites et utilisation
description: Format des erreurs de l’API et codes d’état courants, solde et quotas, limites de taille des requêtes et délais d’expiration, ainsi que conseils de dépannage.
sidebar_position: 3
update_docs: none
---

# Erreurs, limites et utilisation {#errors}

## Format des erreurs {#error-format}

Le format du corps d’erreur dépend du protocole de l’API et de l’étape à laquelle l’erreur survient :

- **API compatibles OpenAI** : `{"error": {"type": "...", "message": "..."}}`, certaines erreurs incluant `code` ;
- **API compatibles Anthropic** : `{"type": "error", "error": {"type": "...", "message": "..."}}` ;
- **Vérifications de clé API et de facturation** (avant que la requête n’atteigne le modèle) : `{"code": "...", "message": "..."}`.

Lors du dépannage, vérifiez d’abord le code d’état HTTP, puis consultez `code` ou `type`.

## Codes d’état courants {#status-codes}

### 400 Requête incorrecte {#status-400}

- Le corps de la requête est vide ou n’est pas un JSON valide, il manque `model`, ou un champ a un type incorrect ;
- Une requête vidéo inclut un champ non pris en charge par le modèle : `video_input_unsupported`, et `field` indique de quel champ il s’agit ;
- Le service du modèle a rejeté le contenu de la requête : `upstream_rejected`, éventuellement accompagné d’un `upstream_code` renvoyé par le service du modèle.

### 401 Échec d’authentification {#status-401}

| code | Signification | Que faire |
| --- | --- | --- |
| `API_KEY_REQUIRED` | Aucune clé API fournie | Vérifiez l’en-tête de requête `Authorization: Bearer <YOUR_API_KEY>` |
| `INVALID_API_KEY` | Clé API invalide | Vérifiez la clé dans la console ou créez-en une nouvelle |
| `API_KEY_DISABLED` | Clé API désactivée | Réactivez-la dans la console |

Transmettre la clé API uniquement comme paramètre de requête dans l’URL ne constitue pas une authentification valide et renvoie `API_KEY_REQUIRED`.

### 402 Solde insuffisant {#status-402}

`insufficient_credits` : le solde disponible du compte est insuffisant. Rechargez votre compte sur la page « Recharger » de la console, puis réessayez.

### 403 Accès refusé {#status-403}

| code | Signification | Que faire |
| --- | --- | --- |
| `API_KEY_EXPIRED` | Clé API expirée | Mettez à jour sa période de validité dans la console ou créez une nouvelle clé |
| `ACCESS_DENIED` | L’IP source n’est pas dans la liste autorisée ou figure dans la liste bloquée | Vérifiez les paramètres IP de la clé |

### 404 Introuvable {#status-404}

- `model_not_found` : le nom du modèle est mal orthographié, ou votre compte ne peut pas utiliser ce modèle ;
- Le modèle ne prend pas en charge l’API appelée (par exemple, appeler un point de terminaison de génération d’image avec un modèle de chat) ;
- Le chemin de la requête n’existe pas, souvent parce que le base_url ne contient pas `/v1`.

### 409 Vidéo pas encore prête {#status-409}

`video_not_ready` : la vidéo est encore en cours de génération. Redemandez le téléchargement plus tard.

### 413 Corps de requête trop volumineux {#status-413}

Le corps de la requête dépasse la limite autorisée. Voir [Limites des requêtes](#limits).

### 429 Quota ou limite de débit dépassé {#status-429}

| Scénario | Réponse | Que faire |
| --- | --- | --- |
| Quota total de la clé API épuisé | `API_KEY_QUOTA_EXHAUSTED` | Augmentez le quota dans la console ou réinitialisez le quota utilisé |
| Limite de requêtes simultanées dépassée | `gateway_concurrency_limit` | Réduisez la concurrence et réessayez après avoir attendu |
| Limitation de débit du service du modèle | `upstream_rate_limited` | Réessayez après avoir attendu ; si la réponse inclut `Retry-After`, patientez comme indiqué |

### 5xx Service temporairement indisponible {#status-5xx}

- 502 `upstream_unavailable` : le service du modèle est temporairement indisponible ;
- 503 `no_available_account` ou Service temporairement indisponible : aucune capacité de service n’est actuellement disponible.

Ces erreurs peuvent faire l’objet d’une nouvelle tentative ultérieure ; un recul exponentiel est recommandé.

## Limites des requêtes {#limits}

| Limite | Valeur |
| --- | --- |
| Taille maximale du corps de requête | 100 Mo |
| Attente sans réponse | Le délai de lecture de la couche d’accès est de 600 secondes ; l’API du modèle ou le client peut expirer plus tôt. Il ne s’agit pas du temps d’exécution maximal de l’ensemble de la tâche |
| Plage d’interrogation d’utilisation | Jusqu’à 90 jours |

Le quota total, la période de validité et les restrictions IP au niveau de la clé sont configurés par vos soins dans la console ; les limites de débit et de concurrence au niveau du compte sont définies par la plateforme et renvoient 429 lorsqu’elles sont dépassées.

## Facturation et utilisation {#billing}

- Les appels API sont facturés à chaque fois en fonction de la consommation réelle prélevée sur votre solde en USD. Ce solde est partagé avec la création sur ZaiDrama ; pour le solde et les recharges, voir [Compte, crédits et assistance](../platform/account.md#credits).
- Les prix unitaires en USD de chaque modèle (par million de jetons ou par unité de facturation) sont disponibles sous « Tarification » dans la console.
- Les tâches vidéo ne sont facturées qu’une seule fois, lorsqu’une vidéo est produite avec succès.
- Le détail des appels est disponible sous « Utilisation » dans la console. Chaque enregistrement indique le modèle, l’API, le caractère streaming ou non, le nombre de jetons, le coût (USD) et la durée, et peut être exporté au format CSV.
- Lorsque le solde est insuffisant, le message renvoyé ressemble à `余额不足：这次调用至少需要 $x，当前可用 $y，请充值后再试`.

## Liste de contrôle de dépannage {#troubleshooting}

1. **Toutes les requêtes renvoient 404** : vérifiez si le base_url a été écrit comme `https://api.ourzai.com/v1` (avec `/v1`).
2. **401** : vérifiez si l’en-tête de requête est `Authorization: Bearer <YOUR_API_KEY>` et si la clé API est complète et n’a pas été désactivée.
3. **Un modèle spécifique renvoie 404** : vérifiez si le nom du modèle correspond à la page « Tarification » et si le modèle prend en charge l’API que vous appelez.
4. **402, 403 ou 429** : vérifiez le solde disponible, le quota total de la clé API, la période de validité, les paramètres IP et la concurrence.
5. **La vidéo reste en `pending`** : la génération d’une vidéo prend un certain temps ; interrogez l’état à intervalles réguliers. `expired` signifie que la tâche a expiré et doit être soumise à nouveau.
6. **Problème non résolu** : envoyez un e-mail à support@ourzai.com en indiquant l’heure de survenue, l’API appelée, le nom du modèle et la réponse d’erreur. N’incluez pas la clé API complète.
