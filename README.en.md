# ZAI Documentation

Public documentation for the ZAI platform, Meet Zai, ZaiDrama, and the developer API.

[Read the documentation](https://docs.ourzai.com/en/) · [简体中文](README.md)

## Local development

The Node.js version is declared in `.node-version`; pnpm is pinned in `package.json`.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm start
```

Before submitting changes, run `pnpm test`, `pnpm check`, `pnpm check-consistency`, and `pnpm build`.
Local search requires a production build served with `pnpm serve`.

## Content and publishing

`docs/` contains Simplified Chinese source documents; `i18n/` contains the other six languages.
See the [language maintenance guide](i18n/README.md) for the translation workflow and
[CONTRIBUTING.md](CONTRIBUTING.md) for page responsibilities and contribution requirements.
After all checks pass, the main branch deploys to the existing Cloudflare Pages project `zaidrama-docs`.
The canonical domain remains `docs.ourzai.com`, and all page paths are preserved.
See [PUBLISHING.md](PUBLISHING.md) for deployment and rollback instructions.

The site was migrated from `website/` in `z55183980-gif/zaidrama` at commit
`b1341cdff176073704fd79d63e3cbac5c8392e8b`, retaining the original [license](LICENSE).
Product code, runtime configuration, and internal architecture documentation remain in their respective repositories.
