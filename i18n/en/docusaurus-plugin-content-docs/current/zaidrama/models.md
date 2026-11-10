---
id: models
title: ZaiDrama Models and Capabilities
description: How the ZaiDrama creative app selects models by purpose for each generation, and how to choose models, adjust parameters, and resolve generation issues.
sidebar_position: 4
update_docs: engine-b
---

# ZaiDrama Models and Capabilities {#providers}

This page explains how to choose models, understand their capabilities, and resolve generation issues in ZaiDrama. To call platform models directly from your own application, see [API Quick Start](../api/quickstart.md).

You don't need third-party API keys to create in ZaiDrama. ZaiDrama selects models **by purpose** for every call, and Where a model selector is available, you can choose from the models the platform offers.

## 1. Selecting Models by Purpose {#model-usages}

ZaiDrama uses different models for different tasks:

| Category | Purpose | What it does |
| --- | --- | --- |
| Text | Simple tasks | Source text summaries, style image analysis, consistency checks |
| Text | Complex tasks | Scripts, batch planning, canvas writing |
| Text | Canvas assistant | Zai acting on your behalf in the creative canvas |
| Text | Canvas visual and audio understanding | Canvas Zai viewing images, videos, and audio in nodes |
| Text | Web retrieval | Canvas Zai querying the web when it needs real-time information |
| Image | Text-to-image | Character images, scene images, storyboard images, and other text-only image generation |
| Image | Image-to-image | Image generation with reference images and image editing |
| Video | Image-to-video | Videos driven by storyboard first frames and grid layouts |
| Video | Reference-to-video | Generating videos directly from character, scene, prop, or product reference images |
| Audio | Narration | Narration voiceovers and character voice previews |

When you use the default selection, the platform chooses the currently available model for the corresponding purpose.

## 2. Where You Can Choose Models {#user-model-selection}

| Location | What you can choose |
| --- | --- |
| Project Info → Episode Parameters → Auto Mode | No model selection; choose only "Video Quality" (Fast / Standard / High Quality) and aspect ratio. The platform picks models by quality tier |
| Project Info → Episode Parameters → Pro Mode | Choose models and resolutions separately for image-to-video, reference-to-video, text-to-image, and image-to-image; defaults to "Follow global route" |
| Project Settings → Narration Voiceover | Default narration model, narration voice, and speech rate |
| Creative Canvas → Node generation panel | The model used for this generation |

- Dropdown menus show the models currently available for that purpose.
- When a model specified in the project is temporarily unavailable, the interface shows "The model specified in the project is currently unavailable." You can switch back to "Follow global route."
- Zai's conversation model and other text purposes are configured by the platform; users cannot choose them.
- The personal "Settings" page has no model options.

For your first production, it's advisable to validate style and results with a small number of clips before expanding the scope.

## 3. Capability Boundaries {#capability-boundaries}

The platform declares capabilities per specific model, rather than inferring them from the vendor as a whole. The following are capability categories; which ones a given model supports depends on the options actually available in the generation panel and dropdowns:

- **Text**: structured output, image understanding (image input);
- **Image**: text-to-image, image-to-image (generation and editing with reference images), supported resolutions and aspect ratios;
- **Video**: image-to-video (first-frame driven, with some models supporting end frames), reference-to-video (multiple reference images, with count and type varying by model), reference audio, supported duration, resolutions, and aspect ratios;
- **Video audio track**: some models let you choose whether to generate an audio track, some always produce sound, and some are always silent;
- **Voice**: TTS and selectable voices; speech rate is adjusted in project settings or canvas voice nodes.

Requests that exceed a model's declared capabilities (for example, passing an end frame to a model that doesn't support end frames) are explicitly rejected before submission, and are never silently swapped for a model you didn't choose.

## 4. Fees and Credits {#credits-and-usage}

Users should refer to the available balance and balance details in "Billing & Balance" under the account menu. The platform records the purpose, model, status, and cost (in USD) of each generation; each generation is charged as "rate × usage," precise to $0.0001 with a minimum of $0.0001. Charging results are reflected in the balance details.

If you encounter insufficient balance or abnormal charges, note the project name and time the issue occurred, then contact online support via "Help & Feedback." Do not repeatedly click generate or attempt to bypass credit checks.

## 5. Troubleshooting {#troubleshooting}

### User Side {#user-troubleshooting}

- **A model is missing from the dropdown**: the model is not offered for this purpose, or it is temporarily unavailable;
- **The model specified in the project is unavailable**: switch back to "Follow global route" or choose another candidate;
- **Generation failed**: first read the failure reason stated on the conversation or batch page, and only retry the affected clips;
- **Queued for too long**: tasks are scheduled uniformly by the platform; do not resubmit;
- **Insufficient balance**: check your balance and details in "Billing & Balance."
