---
id: grok-imagine-video-1.5
title: grok-imagine-video-1.5 — Guide d’intégration
description: grok-imagine-video-1.5 — Guide d’intégration
sidebar_position: 13
update_docs: none
---

# grok-imagine-video-1.5 — Guide d’intégration {#integration}

Utilisez l’identifiant exact de cette page dans model. Seules les interfaces ci-dessous sont couvertes pour ce modèle.

`model`: `grok-imagine-video-1.5`

## Modèles et interfaces {#endpoints}

| Interfaces prises en charge | HTTP |
|---|---|
| `videos.generations` | `POST /v1/videos/generations` |

## Préparation et authentification {#setup}

Les exemples lisent ZAI_API_KEY dans l’environnement. Python utilise uniquement sa bibliothèque standard. Conservez la clé sur votre serveur, jamais dans le navigateur. Les appels peuvent être facturés ; les exemples produisent de petits résultats.

```bash
export ZAI_API_KEY="<your-api-key>"
```

## Paramètres et limites {#parameters}

Les configurations ci-dessous sont des requêtes minimales pour cette plateforme, pas une liste exhaustive ni des limites maximales. Les paramètres avancés absents ne sont pas vérifiés ici. Ne transposez pas les limites d’un autre fournisseur ou modèle.

Configuration vérifiée : duration=6 secondes, resolution=480p, aspect_ratio=16:9 et prompt textuel. duration est entier. Les images initiales/finales, reference_images, reference_audios, generate_audio, seed et watermark ne sont pas vérifiés ici. Ne déduisez pas leur prise en charge d’un autre modèle. Les deux modèles Grok suivent ce processus avec des identifiants et tarifs distincts.

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


import time
from pathlib import Path
from urllib.parse import quote

created = json.loads(
    call(
        "/videos/generations",
        {
            "model": "grok-imagine-video-1.5",
            "prompt": "A red mug on a table, slow camera movement",
            "duration": 6,
            "resolution": "480p",
            "aspect_ratio": "16:9",
        },
    )
)
task_id = created.get("request_id") or created.get("id")
if not task_id:
    raise RuntimeError(created)
print("task_id:", task_id, flush=True)
path = "/videos/" + quote(task_id, safe="")
deadline = time.monotonic() + 600
while time.monotonic() < deadline:
    status = json.loads(call(path))
    if status.get("status") == "done":
        Path("result.mp4").write_bytes(call(path + "/content"))
        break
    if status.get("status") in ("failed", "expired"):
        raise RuntimeError(status)
    time.sleep(5)
else:
    raise TimeoutError(f"Keep task ID {task_id} and query its status later")
```

## Résultats et erreurs {#results}

Une soumission réussie ne signifie pas que la vidéo est prête. L’exemple accepte request_id/id, interroge pending → done puis télécharge /content avec la même clé ; video.url peut être relatif. failed/expired sont terminaux ; 409 signifie que le résultat n’est pas prêt. N’envoyez pas la clé à un autre domaine. Après un délai dépassé, vérifiez la tâche existante avant de soumettre à nouveau.

Ce catalogue décrit l’intégration, pas la disponibilité en temps réel. GET /v1/models liste les modèles accessibles avec votre clé ; les tarifs sont dans la console. Un modèle répertorié peut renvoyer 502/503 pendant une panne ou un délai de récupération. Réessayez avec un délai croissant.

## Documentation associée {#related}

- [Tous les modèles](../models.md)
- [Démarrage rapide](../quickstart.md)
- [Erreurs et consommation](../errors.md)
