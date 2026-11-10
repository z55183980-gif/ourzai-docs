---
id: claude-sonnet-5-5
title: claude-sonnet-5-5 — Guide d’intégration
description: claude-sonnet-5-5 — Guide d’intégration
sidebar_position: 4
update_docs: none
---

# claude-sonnet-5-5 — Guide d’intégration {#integration}

Utilisez l’identifiant exact de cette page dans model. Seules les interfaces ci-dessous sont couvertes pour ce modèle.

`model`: `claude-sonnet-5-5`

## Modèles et interfaces {#endpoints}

| Interfaces prises en charge | HTTP |
|---|---|
| `chat.completions` | `POST /v1/chat/completions` |

## Préparation et authentification {#setup}

Les exemples lisent ZAI_API_KEY dans l’environnement. Python utilise uniquement sa bibliothèque standard. Conservez la clé sur votre serveur, jamais dans le navigateur. Les appels peuvent être facturés ; les exemples produisent de petits résultats.

```bash
export ZAI_API_KEY="<your-api-key>"
```

## Paramètres et limites {#parameters}

Les configurations ci-dessous sont des requêtes minimales pour cette plateforme, pas une liste exhaustive ni des limites maximales. Les paramètres avancés absents ne sont pas vérifiés ici. Ne transposez pas les limites d’un autre fournisseur ou modèle.

messages est un tableau de rôles et de textes. max_tokens fixe le budget de sortie, ici 256. stream vaut false par défaut ; avec true, lisez les événements SSE jusqu’à [DONE].

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


body = {"model": "claude-sonnet-5-5", "messages": [{"role": "user", "content": "Hello"}], "max_tokens": 256}
response = json.loads(call("/chat/completions", body))
print(response["choices"][0]["message"]["content"])
```

## Dialogue en streaming {#streaming}


```bash
curl --fail-with-body --no-buffer https://api.ourzai.com/v1/chat/completions \
  -H "Authorization: Bearer $ZAI_API_KEY" -H "Content-Type: application/json" \
  -d '{"model":"claude-sonnet-5-5","messages":[{"role":"user","content":"Hello"}],"max_tokens":256,"stream":true}'
```

## Résultats et erreurs {#results}

Lisez choices[0].message.content, ou choices[].delta.content en streaming. Gérez les erreurs SSE et les coupures même après HTTP 200. Responses place le texte dans les éléments output_text de output[].content[] ; Messages utilise les éléments text de content[]. Ces formats ne sont pas interchangeables.

Ce catalogue décrit l’intégration, pas la disponibilité en temps réel. GET /v1/models liste les modèles accessibles avec votre clé ; les tarifs sont dans la console. Un modèle répertorié peut renvoyer 502/503 pendant une panne ou un délai de récupération. Réessayez avec un délai croissant.

## Documentation associée {#related}

- [Tous les modèles](../models.md)
- [Démarrage rapide](../quickstart.md)
- [Erreurs et consommation](../errors.md)
