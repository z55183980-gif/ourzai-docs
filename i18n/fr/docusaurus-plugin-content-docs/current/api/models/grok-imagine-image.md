---
id: grok-imagine-image
title: grok-imagine-image — Guide d’intégration
description: grok-imagine-image — Guide d’intégration
sidebar_position: 9
update_docs: none
---

# grok-imagine-image — Guide d’intégration {#integration}

Utilisez l’identifiant exact de cette page dans model. Seules les interfaces ci-dessous sont couvertes pour ce modèle.

`model`: `grok-imagine-image`

## Modèles et interfaces {#endpoints}

| Interfaces prises en charge | HTTP |
|---|---|
| `images.generations` | `POST /v1/images/generations` |
| `images.edits` | `POST /v1/images/edits` |

## Préparation et authentification {#setup}

Les exemples lisent ZAI_API_KEY dans l’environnement. Python utilise uniquement sa bibliothèque standard. Conservez la clé sur votre serveur, jamais dans le navigateur. Les appels peuvent être facturés ; les exemples produisent de petits résultats.

```bash
export ZAI_API_KEY="<your-api-key>"
```

## Paramètres et limites {#parameters}

Les configurations ci-dessous sont des requêtes minimales pour cette plateforme, pas une liste exhaustive ni des limites maximales. Les paramètres avancés absents ne sont pas vérifiés ici. Ne transposez pas les limites d’un autre fournisseur ou modèle.

model et prompt sont requis. Configuration minimale : n=1, size=1024x1024, response_format=b64_json. La modification utilise multipart/form-data avec un PNG local dans image et une consigne dans prompt. L’exemple utilise une image ; aucune limite multi-image, autre taille ou valeur de quality n’est promise ici.

## Exemple complet {#example}


```python
import json
import os
import urllib.error
import urllib.request

BASE = "https://api.ourzai.com/v1"
KEY = os.environ["ZAI_API_KEY"]


def call(path, body=None, timeout=180):
    headers = {"Authorization": f"Bearer {KEY}"}
    data = None
    if body is not None:
        headers["Content-Type"] = "application/json"
        data = json.dumps(body).encode("utf-8")
    request = urllib.request.Request(BASE + path, data=data, headers=headers)
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            return response.read()
    except urllib.error.HTTPError as error:
        raise RuntimeError(f"HTTP {error.code}: {error.read().decode(errors='replace')}") from error


import base64
from pathlib import Path
from urllib.parse import urlsplit


def save_image(response, name):
    item = response["data"][0]
    if item.get("b64_json"):
        data = base64.b64decode(item["b64_json"])
    else:
        url = item["url"]
        if url.startswith("data:"):
            data = base64.b64decode(url.split(",", 1)[1])
        else:
            if urlsplit(url).scheme != "https":
                raise ValueError("Expected an HTTPS image URL")
            with urllib.request.urlopen(url, timeout=180) as response:
                data = response.read()
    suffix = ".png" if data.startswith(b"\x89PNG") else ".jpg" if data.startswith(b"\xff\xd8") else None
    if suffix is None:
        raise ValueError("Unexpected image format")
    Path(name + suffix).write_bytes(data)


body = {
    "model": "grok-imagine-image",
    "prompt": "A red mug on a white table",
    "n": 1,
    "size": "1024x1024",
    "response_format": "b64_json",
}
save_image(json.loads(call("/images/generations", body, timeout=240)), "generated")
```

### `/images/edits` {#edits}

```bash
curl --fail-with-body https://api.ourzai.com/v1/images/edits \
  -H "Authorization: Bearer $ZAI_API_KEY" \
  -F 'model=grok-imagine-image' \
  -F 'prompt=Change the mug to blue' \
  -F 'image=@input.png;type=image/png' \
  -F 'n=1' -F 'size=1024x1024' -F 'response_format=b64_json' \
  -o edited.json
```

```python
save_image(json.loads(Path("edited.json").read_text(encoding="utf-8")), "edited")
```

## Résultats et erreurs {#results}

Le tableau data peut contenir b64_json ou url. L’exemple décode ou télécharge puis choisit PNG/JPEG selon la signature réelle. N’envoyez jamais ZAI_API_KEY à une URL d’image tierce.

Ce catalogue décrit l’intégration, pas la disponibilité en temps réel. GET /v1/models liste les modèles accessibles avec votre clé ; les tarifs sont dans la console. Un modèle répertorié peut renvoyer 502/503 pendant une panne ou un délai de récupération. Réessayez avec un délai croissant.

## Documentation associée {#related}

- [Tous les modèles](../models.md)
- [Démarrage rapide](../quickstart.md)
- [Erreurs et consommation](../errors.md)
