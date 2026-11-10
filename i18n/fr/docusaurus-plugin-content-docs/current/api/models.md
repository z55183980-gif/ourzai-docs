---
id: models
title: Catalogue et intégration des modèles
description: Catalogue et intégration des modèles
sidebar_position: 4
update_docs: none
---

# Catalogue et intégration des modèles {#models}

Choisissez un modèle pour consulter ses interfaces et des exemples complets. Utilisez son identifiant exact : les modèles d’un même fournisseur ne prennent pas nécessairement en charge les mêmes interfaces.

Ce catalogue décrit l’intégration, pas la disponibilité en temps réel. GET /v1/models liste les modèles accessibles avec votre clé ; les tarifs sont dans la console. Un modèle répertorié peut renvoyer 502/503 pendant une panne ou un délai de récupération. Réessayez avec un délai croissant.

## Modèles et interfaces {#matrix}

| Modèle | Type | Interfaces prises en charge |
|---|---|---|
| [gpt-6-astra](./models/gpt-6-astra.md) | Dialogue | `chat.completions`, `responses` |
| [gpt-6-sol](./models/gpt-6-sol.md) | Dialogue | `chat.completions`, `responses` |
| [gpt-5.6-sol](./models/gpt-5.6-sol.md) | Dialogue | `chat.completions` |
| [claude-sonnet-5-5](./models/claude-sonnet-5-5.md) | Dialogue | `chat.completions` |
| [claude-opus-5-5](./models/claude-opus-5-5.md) | Dialogue | `chat.completions`, `messages`, `messages.count_tokens` |
| [gpt-image-2](./models/gpt-image-2.md) | Image | `images.generations`, `images.edits` |
| [gpt-image-2.5-flare](./models/gpt-image-2.5-flare.md) | Image | `images.generations`, `images.edits` |
| [gpt-image-2.5-sunburst](./models/gpt-image-2.5-sunburst.md) | Image | `images.generations`, `images.edits` |
| [grok-imagine-image](./models/grok-imagine-image.md) | Image | `images.generations`, `images.edits` |
| [grok-imagine-image-2.0](./models/grok-imagine-image-2.0.md) | Image | `images.generations`, `images.edits` |
| [grok-imagine-image-quality](./models/grok-imagine-image-quality.md) | Image | `images.generations`, `images.edits` |
| [grok-imagine-video](./models/grok-imagine-video.md) | Vidéo | `videos.generations` |
| [grok-imagine-video-1.5](./models/grok-imagine-video-1.5.md) | Vidéo | `videos.generations` |
| [minimax-h3](./models/minimax-h3.md) | Vidéo | `videos.generations` |
| [cosyvoice2-0.5b](./models/cosyvoice2-0.5b.md) | Synthèse vocale | `audio.speech` |

## Obtenir la liste actuelle des modèles {#live-models}


```bash
curl --fail-with-body https://api.ourzai.com/v1/models \
  -H "Authorization: Bearer $ZAI_API_KEY"
```

## Documentation associée {#related}

- [Démarrage rapide](./quickstart.md)
- [Erreurs et consommation](./errors.md)
