---
id: endpoints
title: Interfaces et fonctionnalités
description: Les interfaces de chat, vectorielles, d'image, audio et vidéo fournies par api.ourzai.com, y compris les flux de travail pour soumettre, interroger et télécharger les tâches vidéo.
sidebar_position: 2
update_docs: none
---

# Interfaces et fonctionnalités {#endpoints}

Les interfaces répertoriées dans ce document sont situées à `https://api.ourzai.com/v1/` et prennent en charge à la fois les formats compatibles OpenAI et Anthropic. Consultez [Démarrage rapide de l'API](./quickstart.md#get-key) pour les détails d'authentification.

## Quelles interfaces un modèle peut-il utiliser ? {#model-endpoints}

Différents modèles prennent en charge différentes interfaces : un modèle de chat ne peut pas générer d'images et un modèle de génération vidéo ne peut pas discuter. La page **Tarification** de la console indique les interfaces prises en charge par chaque modèle, vérifiez donc cela avant d'effectuer un appel. L'utilisation d'une interface non prise en charge par un modèle, ou l'appel d'un modèle que votre compte ne peut pas utiliser, renverra une erreur 404.

## Authentification {#authentication}

Transmettez votre clé API en utilisant l'une des méthodes suivantes :

- `Authorization: Bearer <YOUR_API_KEY>` (recommandé ; à utiliser pour toutes les interfaces compatibles OpenAI) ;
- `x-api-key: <YOUR_API_KEY>` (la méthode du SDK Anthropic) ;
- `x-goog-api-key: <YOUR_API_KEY>` (peut également être utilisé pour transmettre la clé ; cela n'implique pas la prise en charge de l'interface native Gemini).

Ne placez pas la clé dans les paramètres de requête de l'URL (par exemple, `?api_key=`) ; ces requêtes seront rejetées.

## Texte {#text}

| Méthode et chemin | Objectif |
| --- | --- |
| `POST /v1/chat/completions` | Complétions de chat, compatibles OpenAI, prend en charge le streaming via `stream` |
| `POST /v1/responses` | Interface OpenAI Responses |
| `POST /v1/messages` | Compatible avec les messages Anthropic |
| `POST /v1/messages/count_tokens` | Calculer le nombre de jetons pour les requêtes au format Anthropic |
| `POST /v1/embeddings` | Vecteurs de texte ; pris en charge uniquement par certains modèles |
| `GET /v1/models` | Liste des modèles |

## Images {#images}

| Méthode et chemin | Objectif |
| --- | --- |
| `POST /v1/images/generations` | Texte vers image, compatible OpenAI |
| `POST /v1/images/edits` | Image vers image et retouche d'image, compatible OpenAI |

Les interfaces d'image renvoient les résultats de manière synchrone.

## Audio {#audio}

| Méthode et chemin | Objectif |
| --- | --- |
| `POST /v1/audio/speech` | Synthèse vocale, compatible OpenAI |
| `POST /v1/audio/transcriptions` | Reconnaissance vocale, compatible OpenAI |

Les réponses peuvent inclure `X-Zai-Audio-Duration-Ms` (durée audio en millisecondes) ou `X-Zai-Audio-Confidence` (confiance de transcription), selon le modèle utilisé.

## Génération vidéo {#video}

La génération vidéo est asynchrone : soumettez d'abord une tâche pour recevoir un `request_id`, puis interrogez le statut et téléchargez le résultat une fois la vidéo prête.

| Méthode et chemin | Objectif |
| --- | --- |
| `POST /v1/videos/generations` | Soumettre une tâche vidéo ; renvoie `request_id` |
| `GET /v1/videos/generations/{request_id}` | Interroger le statut de la tâche |
| `GET /v1/videos/generations/{request_id}/content` | Télécharger la vidéo générée |

`/v1/videos` et `/v1/videos/{request_id}` sont des chemins abrégés équivalents.

### Soumettre une tâche {#video-submit}

Champs du corps de la requête :

| Champ | Description |
| --- | --- |
| `model` | Obligatoire ; le nom du modèle vidéo |
| `prompt` | Description des éléments visuels et du mouvement |
| `duration` | Durée (secondes) |
| `aspect_ratio` | Format d'image |
| `resolution` | Résolution |
| `generate_audio` | Indique s'il faut générer une piste audio |
| `seed` | Graine aléatoire |
| `watermark` | Indique s'il faut ajouter un filigrane |
| `image` | Image de la première image |
| `last_frame` | Image de la dernière image |
| `reference_images` | Liste des images de référence |
| `reference_audios` | Liste des clips audio de référence |

Les champs et valeurs pris en charge varient selon le modèle. Utilisez la page **Tarification** pour confirmer l'interface vidéo et la tarification ; renseignez les paramètres spécifiques en fonction des capacités du modèle que vous avez sélectionné. Si la validation des paramètres échoue, la réponse peut renvoyer une erreur 400 avec `video_input_unsupported` et indiquer dans `field` quels champs doivent être ajustés.

```bash
curl https://api.ourzai.com/v1/videos/generations \
  -H "Authorization: Bearer $ZAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "<VIDEO_MODEL_ID>", "prompt": "Sunset by the sea, with a slow camera push-in", "duration": 5}'
```

### Interroger le statut et récupérer les résultats {#video-status}

La requête renvoie `request_id` et `status`. Lorsque la vidéo est prête, elle inclut `video.url` (avec la durée, la résolution, etc.) ; en cas d'échec, elle inclut `error.code` et `error.message`. Valeurs possibles pour `status` :

| Statut | Signification |
| --- | --- |
| `pending` | Génération en cours ; réessayez plus tard |
| `done` | Terminé ; prêt à être téléchargé |
| `failed` | Échec de la génération ; consultez `error` |
| `expired` | Tâche expirée |

### Télécharger la vidéo {#video-download}

Après `done`, demandez `/content` pour récupérer le fichier vidéo. Si la vidéo n'est pas encore prête, la requête renvoie 409 `video_not_ready` ; réessayez simplement plus tard.

La génération vidéo n'est facturée qu'une seule fois en cas de réussite ; les interrogations répétées n'entraînent aucun frais supplémentaire.

## Appeler les modèles Gemini {#gemini}

L'interface native Gemini sous `/v1beta/` n'est actuellement pas disponible. Pour appeler les modèles Gemini, vérifiez d'abord la page **Tarification** pour confirmer l'interface compatible prise en charge par le modèle, puis utilisez le chemin `/v1/` correspondant.

## Intégration par modèle {#model-guides}

[Catalogue et intégration des modèles](./models.md) — Choisissez un modèle pour consulter ses interfaces et des exemples complets. Utilisez son identifiant exact : les modèles d’un même fournisseur ne prennent pas nécessairement en charge les mêmes interfaces.
