---
id: faq
title: ZaiDrama FAQ
description: Frequently asked questions about accounts, production progress, reshoots, canvas, voiceover, and downloads in the ZaiDrama creation app.
sidebar_position: 5
update_docs: engine-b
---

# ZaiDrama FAQ {#faq}

This article covers the most common account, production, and download questions in the ZaiDrama creation app. If this is your first time using it, we recommend starting with the [ZaiDrama Getting Started Guide](./getting-started.md). For platform accounts and balances, see [Account, Balance, and Support](../platform/account.md).

## What capability boundaries should I understand before using ZaiDrama? {#capability-boundaries}

- Media generation is scheduled by the platform across upstream model services. Generation speed, availability, and content policies may change with current service status.
- Zai automatically advances most steps, but for long-form content we still recommend reviewing the plan, character reference sheets, and key segments. ZaiDrama aims to enhance creators, not replace judgment.
- Different video models support different limits on reference image count, duration, audio tracks, and resolution.
- Simply open the website and log in to get started. No software installation or third-party API keys are required.

## Registration, Login, and Account {#install-deploy-update}

### How do regular users get started? {#how-to-install}

On the landing page, click "Start Creating", register or log in with a ZAI account, then enter the home page. Type what video you want to make in the input box, or attach a novel, script, and reference images. Sending the first message creates a project and takes you to the project page. This step does not incur any charges.

### How do I log in? What if I forget my password? {#default-login}

- The login dialog supports email or username login. There is no default account; you need to register first.
- If you forget your password, click "Forgot password?" in the login dialog and reset it with an email verification code.
- If you are already logged in and want to change your password, go to "Personal Center" in the account menu and click "Change Password".
- When entering from ourzai.com via "Creation Workspace", you won't need to re-enter your password if you already have a valid session. ZaiDrama and the ZAI platform share the same account.

Never share your password or verification code with anyone via chat.

### How do I view logged-in devices or delete my account? {#account-security}

In "Personal Center" under "Login Devices", you can see all logged-in devices and click "Sign Out" on individual devices. "Delete Account" is also in Personal Center.

### What should I do if platform pages won't open or requests fail? {#page-request-failure}

First check your network connection and login status, then refresh the page and retry. If only a single project or generation fails, check the failure reason stated in the conversation or batch page. For persistent failures, contact online support via "Help & Feedback" in the account menu, noting the time and page where it occurred. If needed, download diagnostic logs from "Settings → Diagnostic Logs" and send them to support. Do not upload environment files or paste credentials into chat.

### How does the platform update? Will I lose projects? {#platform-updates}

The website updates automatically; users do not need to install update packages. During updates, videos already submitted to model services will continue waiting for results. A small number of in-progress image tasks may be marked as interrupted and need to be regenerated. Completed outputs will not be silently overwritten by new versions.

### Where are projects stored? How do I back them up? {#where-is-data}

Projects, assets, and generation results are stored on the platform. We recommend downloading content you need to keep long-term. You can download finished videos, editable packages, and narration audio at any time, but the platform does not provide project-level ZIP export. Account and balance data are not included in any download.

### What if storage is full? {#storage-full}

In the account menu under "Storage", check the capacity limit and usage per project. Use "Clean History" to delete historical versions you no longer need (only historical versions are deleted; currently used versions are retained).

## Conversing with Zai {#setup-and-assistant}

### What credentials do I need to configure before starting production? {#required-credentials}

None. Regular users only need a ZAI account. Zai's conversation, text/image/video/voice capabilities, and task resources are all provided by the platform.

### How do I get Zai to start or resume production? {#start-or-resume-assistant}

Just state your goal directly in the project's Zai conversation, such as "Start production" or "Continue shooting the rest". Zai will first review the project's current progress and continue from where it left off. When it needs your decision, it will show a question card or confirmation card above the input box.

### Will Zai spend money without asking me? {#assistant-spending}

It will not exceed the scope you approve:

- Before shooting starts, Zai gives you a quote. After you click "Approve & Start", steps within that budget run automatically without further interruptions.
- When the shooting budget is exceeded or the rework budget is insufficient, a confirmation card appears again.
- Actions that incur no cost, such as analyzing source text, organizing the plan, or writing the first draft of a script, are completed directly and reported to you afterward.
- When Zai wants to overwrite content you have manually edited, it will also ask for your consent first.

### Can I shoot only part of it first? {#partial-production}

Yes. Tell Zai "Shoot episode 1 first" or "Only shoot the first two segments". The quote and budget will cover only those segments, and subsequent storyboards and videos will stay within that scope. After finishing, tell Zai to continue with the rest.

### If I edit things directly on the workspace, does Zai know? {#workbench-edits}

Yes. When you add new items to the asset library, Zai reads them first and asks how you want to use them. Actions like switching versions or re-compositing leave a record in the conversation that Zai will see before its next turn. When Zai wants to overwrite content you edited, it will ask for confirmation first, listing each "old → new" change on the card.

### What if Zai won't start or requests time out? {#assistant-startup-failure}

First refresh the page. Zai automatically reconnects if the connection drops, and the current turn will not be interrupted. If it still doesn't work, note the time and contact online support via "Help & Feedback".

## Models and Providers {#providers-models-api}

### Which models does ZaiDrama support? Can I choose them myself? {#supported-providers}

The platform selects models for each invocation based on the task (text-to-image, image-to-video, reference-to-video, narration, etc.). The available range is shown on the product page. You can choose from the platform's available candidates in the episode parameters (Pro Mode) under "Project Info", the narration voiceover in project settings, and the generation panel of the creative canvas. Zai's conversation model cannot be selected. See [Models and Capabilities](./models.md).

### Can I use my own model provider in ZaiDrama? {#custom-provider-setup}

No. ZaiDrama provides ready-to-use models and does not support adding your own model providers.

- To call platform models from your own program: create an API key in the developer console and set base_url to `https://api.ourzai.com/v1`. See the [API Quickstart](../api/quickstart.md).
- The "Settings → API Tokens" option in ZaiDrama creates tokens for external tools to access ZaiDrama itself, which is different from developer console API keys.

### What should I do if generation fails? {#auth-rate-limit-timeout}

First check the failure reason: the submission card in the conversation and the batch page both state which items failed and why. The platform automatically retries when upstream services are rate-limited or temporarily unavailable. If retries don't help, reshot only the affected segments; don't resubmit the entire batch. If a timeout occurs after submission, the upstream task may have already been created. Don't blindly retry in rapid succession—wait a bit and check results, then contact support if the issue persists.

## Project Workflow and Production {#project-workflow-and-tasks}

### Do I need to choose storytelling, episode, or ad mode first? {#choose-mode-and-route}

No. Projects have no content mode and no generation route that locks after creation. Zai decides the type of each segment (performance, narration, showcase, etc.) and video generation method (storyboard-guided or reference-guided) based on the material. You can mix them within the same episode. See [Creation Workflow](./workflows.md).

### What source file formats are supported? {#supported-source-formats}

- Files: `.txt`, `.md`, `.docx`, `.epub`, `.pdf`. Each file must be under 50MB, up to 5 files per attachment.
- Images: PNG, JPG, WebP. Each image must be under 5MB, up to 5 images per attachment.
- You can attach files and images directly in the Zai input box on the home page or in a project. You can also use "Upload Source File" on the project's Scripts page.
- Pasting a very long text auto-collapses into a "Pasted Text" card, which is saved as source text when sent.

Scanned PDFs have no extractable text and require OCR first. Convert legacy `.doc` files to `.docx` before uploading.

### Where can I check production progress? {#production-progress}

- The status label in the center of the top bar, such as "Producing · Storyboards 8/11" or "Needs Your Decision".
- The five-stage progress, "Needs Your Decision", and "Latest Outputs" on the workspace Kanban board.
- The Batches page for batch-by-batch previews. Each segment shows the prompt sent to the video model and the failure reason if any.

### Why has production stalled? {#stage-blocked}

Common reasons:

- A step is waiting for your confirmation (the Kanban shows "A step needs your confirmation", with the confirmation card above the dialog box).
- A character has multiple looks, but some segments haven't had a look selected.
- Some segments in a stage failed and need you to decide whether to retry or revise.
- The current shooting scope is complete; to continue with more, tell Zai.

### How do I pause, resume, or cancel production? {#task-states}

Just tell Zai in the conversation, such as "Pause", "Continue", or "Cancel this production". After canceling and resuming, only canceled or missing parts are redone; completed results are retained and reused.

### What if I only want to reshoot one segment? {#reshoot-segment}

In the conversation, specify which segment and how to change it, such as "Make her colder in segment 3". Zai shows an old → new comparison of the changes. After you confirm, only that segment's video is redone. Reshoots use the rework budget separate from the initial shooting budget; if insufficient, Zai asks for confirmation again.

### How do I prevent a satisfactory version from being regenerated and replaced? {#pin-version}

In that asset's "Version History", click "Lock Current Version". Once locked, regenerated results only go into history candidates and won't automatically replace the current version. You can also click "Switch to This Version" anytime to return to a previous result.

## Visuals, Video, and Audio {#visuals-video-audio}

### How do I improve character consistency? {#character-consistency}

First confirm the character reference sheet (one image containing a head-and-shoulders closeup plus front, side, and back full-body views), then generate storyboards and videos. The global asset library supports search and cross-project reuse. When an asset definition changes, existing storyboards and videos are not silently overwritten; they are marked as older than the current content, and you decide whether to reshoot.

### What if a character changes outfits in the story? {#character-looks}

Add a new **look** for the character: in the asset library's character details, click "Add Look", fill in hairstyle, clothing, and accessories, and generate a reference sheet (the main look's reference sheet is required first). Then in the script, select which outfit this character wears for each segment. Segments without a selection will stop at the script step. You can also ask Zai to write the looks and fill in look selections for segments.

### How do I make adjacent segments more coherent? {#shot-continuity}

Lock in characters, scenes, and looks before generating videos. Keep location, time, clothing, and character descriptions consistent. Storyboard-guided segments reference the previous segment's storyboard image for continuity.

### How do first and last frames work? {#first-and-last-frame}

In projects, storyboard-guided segments use the storyboard image as the video's first frame; last frames are not used. To control both first and last frames, enable "First/Last Frame" on a video node in the [Creative Canvas](./canvas.md) (depending on whether the selected model supports it).

### Why do people appear in scene design images? {#people-in-scene-images}

Scene design images are prompted to exclude people, but image models may not fully comply. You can regenerate the scene image or use image editing to remove the people.

### Does ZaiDrama support voiceover? {#voice-over-support}

- **Dialogue** is spoken directly by the video model.
- **Narration** delivery is chosen in the episode parameters under "Project Info": post-production dubbing (default, final video excludes narration voice) or TTS dubbing (platform-synthesized narration). The dubbing model, voice, and speed are adjusted in project settings under "Narration Voiceover".
- The narration segment player can switch between "Original Video" and "TTS Overlay".

### Can I adjust subtitle style? {#subtitle-style}

Yes. In "Project Info → Subtitle Style", adjust font size, vertical position, color, and font. The preview shows exactly what will be burned into the final video, effective from the next composition onward.

## Creative Canvas {#creative-canvas}

### What is the Creative Canvas? How is it different from projects? {#canvas-vs-project}

The Creative Canvas is your personal free-form canvas where you place text, images, video, and audio as nodes and generate directly on them. It is not tied to a project and has no script, batches, or final video delivery. Use projects for shooting a complete multi-episode drama; use the canvas for freely experimenting with visuals or making standalone video segments. Both share assets through the global asset library. See [Creative Canvas](./canvas.md).

### Will Zai spend money directly in the canvas? {#canvas-approval}

Not by default: when Zai is about to spend money on generation, an approval bar appears showing the estimated cost in USD and your balance for you to confirm. You can change the approval mode to "Generate Directly", or check "Auto-confirm rest of this turn" on the approval bar to skip per-image confirmation for the remainder of that turn up to a cumulative limit of $0.20. Irreversible actions like deleting nodes or clearing the canvas always require confirmation.

### Can I share or back up the canvas? {#canvas-share-export}

- "Share" generates a read-only link that others can view without logging in. You can revoke it anytime.
- The canvas can be exported as a zip and imported from a zip.
- "Version History" lets you preview, name, restore snapshots, or save as a new canvas.

## Cost, Data, and Downloads {#cost-data-export}

### Where can I check my balance and expenses? {#view-and-control-cost}

The balance badge in the top bar shows your current USD balance; click it to view usage details. The account menu's "Billing & Balance" shows available balance, reserved funds, balance details, and purchase history; you can also top up there. Balance displays 2 decimal places (truncated), while each charge and other details show 4 decimal places. Daily login rewards and referral rewards are in the "Rewards Center".

### What can I download? {#project-zip-vs-full-backup}

- **Final video**: Batches page → "Review" view → "Episode Video" → "Download" for that episode.
- **Editable package**: "Download Editable Package" in the video segment player. It's a zip containing the video, narration audio, subtitles (`.vtt` / `.srt`), and a description file for further editing in other software.
- **Narration audio**: "Download Audio" in the narration's version history.

The platform does not provide ZIP export of an entire project.

### Why is the editable package missing segments? {#project-export-missing-clips}

The editable package only includes successfully generated content. For missing segments, check the failure reason on the batches page, reshoot or regenerate, then download again.

### Is there a mobile app? {#mobile-app-support}

ZaiDrama is a web app with no standalone native iOS or Android app at this time. Phones can access it via browser, but reviewing batches and editing the canvas are better done on desktop.

### Can I use it commercially or build on it? {#commercial-use}

ZaiDrama's source code is released under AGPL-3.0. See the source repository on [GitHub](https://github.com/z55183980-gif/zaidrama).

## Quality and Cost Best Practices {#quality-and-cost-best-practices}

1. Shoot a few segments first to validate art style, characters, and pacing before scaling up.
2. Finalize character reference sheets and looks before batch-generating storyboards and videos.
3. Keep location, time, clothing, and character descriptions consistent across adjacent segments.
4. Only reference assets that the current segment actually needs; too many reference images dilute constraints.
5. If a single segment has issues, reshoot only that segment; lock satisfactory versions promptly.
6. Plan production scope based on the balance and details in "Billing & Balance".
