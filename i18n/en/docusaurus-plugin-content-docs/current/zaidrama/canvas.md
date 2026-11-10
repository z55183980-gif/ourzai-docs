---
id: canvas
title: Creative Canvas
description: "The ZaiDrama creative canvas: generating on nodes, Zai on the canvas, confirming before generation, version history, and sharing."
sidebar_position: 3
update_docs: engine-b
---

# Creative Canvas {#canvas}

The Creative canvas is an infinite canvas where you can freely arrange ideas, references, and generated results. You can generate images, videos, text, and speech directly on nodes, feed one image into the next node for further work, or ask Zai on the canvas to edit images and make videos for you. It is well suited to trying out styles, making concept art, polishing a single shot, or making a short video that does not need a full script.

## 1. How canvases relate to projects {#canvas-and-projects}

- A canvas belongs to you personally and is not attached to any project; projects do not read canvas content either.
- A canvas is not a second production pipeline: it has no script, batches, or final-cut delivery, and its generated results do not enter a project automatically.
- The two connect through the **global Asset Library**: images on a canvas can be sent with "Save to asset library", and a project reuses them with "From Library" on its Asset Library page; the "Assets" tab in the canvas sidebar can also place Asset Library content onto the canvas.

Use a project when you need to shoot a complete story as a multi-episode short drama; use a canvas when you want to experiment freely with visuals first, or only make a few standalone videos.

## 2. Creating and managing canvases {#manage-canvases}

Click "Creative canvas" in the sidebar to open the canvas list. The first time you arrive with no canvases at all, a blank canvas opens directly.

The list is grouped into "Today / Last 7 days / Earlier", and each card shows what is on the canvas. In the list you can:

- Search canvas names or content from the top bar;
- Create a "New canvas", or "Duplicate" an existing one;
- "Import" a canvas zip, or "Export" a canvas as a zip (when an imported package is not recognized, only its media is imported);
- "Select" multiple canvases to export or delete them in bulk;
- Rename and delete canvases.

Canvases are named automatically from their content: the first time text goes onto a canvas it is named after the first node, and after Zai makes something on the canvas it is named after that turn's request. A name you have changed yourself is never overwritten. A blank canvas that you close without doing anything is discarded automatically and does not stay in the list.

Each canvas opens in a new browser tab. Canvases save automatically, and the top bar shows "Saved / Saving… / Not saved"; if the same canvas is edited in two windows at once and the edits conflict, you are warned with "Conflicts with changes in another window".

## 3. Nodes and connections {#nodes}

The toolbar provides:

- **Select / Hand**: select nodes or pan the canvas;
- **Add nodes**: Text, Image, Video, Audio; multiple nodes can be placed in a Group;
- **Upload files**: PNG, JPG, WEBP, MP4, WEBM, MP3, WAV; images up to 20MB, videos up to 200MB, audio up to 30MB;
- **Use existing assets**: pick from material you have uploaded or generated before;
- **Presets**: for example "Script writer" and "Character turnaround", which lay out a set of commonly used nodes in one go;
- **Canvas settings**: default aspect ratio, default image resolution, background style, and "Clear canvas".

A connection between nodes represents an input relationship: connect an image node to a video node, and it becomes the video's first frame or reference.

The sidebar has three tabs: "Canvas", "Assets", and "Prompts". "Prompts" contains public collections and your own "Mine" prompt library.

## 4. Generating on nodes {#generate}

Select a node to open its generation panel:

| Generate | Settings |
| --- | --- |
| Generate image | Model, resolution, number of images, aspect ratio, style; when the aspect ratio is set to "Auto", the closest ratio to the first reference image is used |
| Generate video | Connect one image as the first frame (the video usually follows its shape); connect two or more and they all go in as references, use `@` to say who is who, and the video comes out at the selected aspect ratio; with "First & last frame" on, the first two images are the start and end frames; resolution, duration, and whether to generate audio |
| Write text | What to write |
| Speech | Voice, speed |

Once generation finishes, the quick actions on the node let you continue with "Make a video", "Make an image", "Add narration", or "Next shot".

Image nodes also provide tools such as describe as prompt, crop, split, upscale, inpaint, new angle, grabbing the first / current / last frame of a video, and save to asset library. Of these, crop, split, and upscale run in the browser and are free of charge.

The selectable generation models come from the candidates the platform has opened for each purpose; see [Models and Capabilities](./models.md).

## 5. Zai on the canvas {#canvas-zai}

The Zai window in the lower-right corner of the canvas can be dragged and resized; double-click it to return it to the lower-right corner. It can see this canvas and can also edit it for you:

- **Scope**: when nodes are selected, it works only on the "N selected" nodes; otherwise it works on the "Whole canvas";
- **Viewing material**: it can view the images, videos, and audio in nodes;
- **Web search**: it searches the web when needed, and what it retrieves is used only as reference material;
- **Memo**: Zai reads the memo at the top of the panel on every turn, and both you and Zai can edit it; canvas defaults such as aspect ratio, style, and resolution carry over to new canvases automatically, so there is no need to write them in the memo;
- **Undo this turn**: revert all of Zai's changes to the canvas in this turn with one click.

Canvas Zai does not assume you are making a short drama; writing stories, making posters, and creating product images all work. The chat model it uses is configured by the platform.

### 5.1 Confirm before generating {#approval}

When a generation will cost money, by default Zai first shows an approval bar stating the estimated cost (in USD) and your balance, and it runs only after you click "Generate"; click "View on canvas" to see which nodes it intends to change first.

- In the Zai panel's approval setting, you can switch to "Generate directly", after which Zai no longer asks each time.
- If you check "Auto-confirm the rest of this turn" on the approval bar, the remaining generations in this turn no longer pop up a card one by one while within the cumulative cap of $0.20; the one generation that would exceed the cap is confirmed as usual.
- Irreversible actions such as deleting nodes or clearing the canvas always require confirmation.

## 6. History {#history}

"History" in the top bar lets you preview, name, or restore canvas snapshots:

- The platform automatically keeps versions periodically while you edit; it also keeps one before content is deleted, before a version is restored, and before Zai modifies the canvas;
- Versions you create with "Save version" and name are not cleaned up automatically;
- You can "Restore this version", or "Save as new canvas".

## 7. Sharing {#share}

"Share" in the top bar can generate a **Read-only link**: anyone with the link can view this canvas without signing in, but cannot edit it. You can "Revoke link" at any time, and the link stops working immediately after it is revoked.
