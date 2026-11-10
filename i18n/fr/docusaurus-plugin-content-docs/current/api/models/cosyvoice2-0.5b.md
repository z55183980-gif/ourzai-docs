---
id: cosyvoice2-0.5b
title: cosyvoice2-0.5b — Guide d’intégration
description: cosyvoice2-0.5b — Guide d’intégration
sidebar_position: 14
update_docs: none
---

# cosyvoice2-0.5b — Guide d’intégration {#integration}

Utilisez l’identifiant exact de cette page dans model. Seules les interfaces ci-dessous sont couvertes pour ce modèle.

`model`: `cosyvoice2-0.5b`

## Modèles et interfaces {#endpoints}

| Interfaces prises en charge | HTTP |
|---|---|
| `audio.speech` | `POST /v1/audio/speech` |

## Préparation et authentification {#setup}

Les exemples lisent ZAI_API_KEY dans l’environnement. Python utilise uniquement sa bibliothèque standard. Conservez la clé sur votre serveur, jamais dans le navigateur. Les appels peuvent être facturés ; les exemples produisent de petits résultats.

```bash
export ZAI_API_KEY="<your-api-key>"
```

## Paramètres et limites {#parameters}

Les configurations ci-dessous sont des requêtes minimales pour cette plateforme, pas une liste exhaustive ni des limites maximales. Les paramètres avancés absents ne sont pas vérifiés ici. Ne transposez pas les limites d’un autre fournisseur ou modèle.

input contient le texte. Utilisez la voix complète FunAudioLLM/CosyVoice2-0.5B:alex et response_format=mp3. La réponse est un flux audio binaire, pas du JSON. Seuls cette voix et ce format sont vérifiés ; aucune autre voix, vitesse ou longueur maximale n’est garantie ici.

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


from pathlib import Path

audio = call(
    "/audio/speech",
    {
        "model": "cosyvoice2-0.5b",
        "input": "Hello. This is a speech test.",
        "voice": "FunAudioLLM/CosyVoice2-0.5B:alex",
        "response_format": "mp3",
    },
)
Path("speech.mp3").write_bytes(audio)
```

## Résultats et erreurs {#results}

Enregistrez la réponse réussie en MP3. Même un texte court peut prendre du temps ; les 180 secondes de délai client ne garantissent pas la latence. Lisez les erreurs non-2xx au lieu de les enregistrer comme audio.

Ce catalogue décrit l’intégration, pas la disponibilité en temps réel. GET /v1/models liste les modèles accessibles avec votre clé ; les tarifs sont dans la console. Un modèle répertorié peut renvoyer 502/503 pendant une panne ou un délai de récupération. Réessayez avec un délai croissant.

## Documentation associée {#related}

- [Tous les modèles](../models.md)
- [Démarrage rapide](../quickstart.md)
- [Erreurs et consommation](../errors.md)
