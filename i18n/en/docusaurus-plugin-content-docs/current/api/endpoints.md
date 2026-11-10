---
id: endpoints
title: Interfaces and Capabilities
description: The chat, vector, image, audio, and video interfaces provided by api.ourzai.com, including workflows for submitting, querying, and downloading video tasks.
sidebar_position: 2
update_docs: none
---

# Interfaces and Capabilities {#endpoints}

The interfaces listed in this document are located at `https://api.ourzai.com/v1/` and support both OpenAI and Anthropic compatible formats. See [API Quick Start](./quickstart.md#get-key) for authentication details.

## Which Interfaces Can a Model Use? {#model-endpoints}

Different models support different interfaces: a chat model cannot generate images, and a video generation model cannot chat. The console's **Pricing** page indicates which interfaces each model supports, so confirm this before making a call. Using an interface that a model does not support, or calling a model that your account cannot use, will return a 404.

## Authentication {#authentication}

Pass your API key using one of the following methods:

- `Authorization: Bearer <YOUR_API_KEY>` (recommended; use this for all OpenAI-compatible interfaces);
- `x-api-key: <YOUR_API_KEY>` (the Anthropic SDK method);
- `x-goog-api-key: <YOUR_API_KEY>` (can also be used to pass the key; this does not imply support for the native Gemini interface).

Do not place the key in URL query parameters (e.g., `?api_key=`); such requests will be rejected.

## Text {#text}

| Method and Path | Purpose |
| --- | --- |
| `POST /v1/chat/completions` | Chat completions, OpenAI-compatible, supports streaming via `stream` |
| `POST /v1/responses` | OpenAI Responses interface |
| `POST /v1/messages` | Anthropic Messages compatible |
| `POST /v1/messages/count_tokens` | Calculate token count for Anthropic-formatted requests |
| `POST /v1/embeddings` | Text vectors; supported by only some models |
| `GET /v1/models` | Model list |

## Images {#images}

| Method and Path | Purpose |
| --- | --- |
| `POST /v1/images/generations` | Text-to-image, OpenAI-compatible |
| `POST /v1/images/edits` | Image-to-image and image editing, OpenAI-compatible |

Image interfaces return results synchronously.

## Audio {#audio}

| Method and Path | Purpose |
| --- | --- |
| `POST /v1/audio/speech` | Text-to-speech, OpenAI-compatible |
| `POST /v1/audio/transcriptions` | Speech-to-text, OpenAI-compatible |

Responses may include `X-Zai-Audio-Duration-Ms` (audio duration in milliseconds) or `X-Zai-Audio-Confidence` (transcription confidence), depending on the model used.

## Video Generation {#video}

Video generation is asynchronous: first submit a task to receive a `request_id`, then poll the status, and download the result once the video is ready.

| Method and Path | Purpose |
| --- | --- |
| `POST /v1/videos/generations` | Submit a video task; returns `request_id` |
| `GET /v1/videos/generations/{request_id}` | Query task status |
| `GET /v1/videos/generations/{request_id}/content` | Download the generated video |

`/v1/videos` and `/v1/videos/{request_id}` are equivalent shorthand paths.

### Submitting a Task {#video-submit}

Request body fields:

| Field | Description |
| --- | --- |
| `model` | Required; the video model name |
| `prompt` | Description of the visuals and motion |
| `duration` | Duration (seconds) |
| `aspect_ratio` | Aspect ratio |
| `resolution` | Resolution |
| `generate_audio` | Whether to generate an audio track |
| `seed` | Random seed |
| `watermark` | Whether to add a watermark |
| `image` | First-frame image |
| `last_frame` | Last-frame image |
| `reference_images` | List of reference images |
| `reference_audios` | List of reference audio clips |

The fields and values supported vary by model. Use the **Pricing** page to confirm the video interface and pricing; fill in the specific parameters according to the capabilities of the model you have selected. If parameter validation fails, the response may return a 400 with `video_input_unsupported` and indicate in `field` which fields need adjustment.

```bash
curl https://api.ourzai.com/v1/videos/generations \
  -H "Authorization: Bearer $ZAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "<VIDEO_MODEL_ID>", "prompt": "Sunset by the sea, with a slow camera push-in", "duration": 5}'
```

### Querying Status and Retrieving Results {#video-status}

The query returns `request_id` and `status`. When the video is ready, it includes `video.url` (along with duration, resolution, etc.); on failure, it includes `error.code` and `error.message`. Possible values for `status`:

| Status | Meaning |
| --- | --- |
| `pending` | Generating; check back later |
| `done` | Completed; ready to download |
| `failed` | Generation failed; see `error` |
| `expired` | Task expired |

### Downloading the Video {#video-download}

After `done`, request `/content` to retrieve the video file. If the video is not ready yet, the request returns 409 `video_not_ready`; simply retry later.

Video generation is billed only once upon successful completion; polling any number of times does not incur additional charges.

## Calling Gemini Models {#gemini}

The native Gemini interface under `/v1beta/` is not currently available. To call Gemini models, first check the **Pricing** page to confirm the compatible interface supported by the model, then use the corresponding `/v1/` path.

## Integrate by model {#model-guides}

[Model catalog and integration](./models.md) — Choose a model to see its exposed endpoints and complete request examples. Use the exact model ID; models from the same provider do not necessarily support the same interfaces.
