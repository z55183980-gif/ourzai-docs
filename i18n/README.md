# Documentation languages

The documentation and homepage offer the same seven languages. `../locales.json`
defines the language names, HTML language tags, search analyzers, and translation sources.

| Target | Source | Writing conventions |
| --- | --- | --- |
| English (`en`) | Simplified Chinese (`zh-Hans`) | Clear, idiomatic English help documentation |
| Traditional Chinese (`zh-HK`) | Simplified Chinese (`zh-Hans`) | Hong Kong written Chinese: 賬戶、電郵、登入、增值、私隱; no colloquial Cantonese |
| French (`fr`) | English (`en`) | Natural French, consistent vous, concise instructions |
| Vietnamese (`vi`) | English (`en`) | Natural Vietnamese, clear bạn phrasing where appropriate |
| Japanese (`ja`) | English (`en`) | Polite です・ます prose, concise headings, standard technical terms |
| Spanish (`es`) | English (`en`) | Natural Spanish, consistent tú and imperative instructions |

Translate complete pages, including tables, descriptions, homepage cards, navigation,
search messages, and accessibility labels. Adapt phrasing to the reader's language;
do not mechanically preserve source sentence structure. Preserve factual claims,
prices, limits, product names, executable examples, identifiers, placeholders,
explicit heading anchors, and route IDs. Keep actual English UI names in parentheses
when needed to help readers navigate products that have not been localized.

Internal Markdown links remain relative. Absolute documentation links use the
target locale prefix. External product and legal links retain their real destinations;
translating the documentation does not imply those products or legal pages support
the same languages. Do not store a static copyright year in footer translations.

English's existing source tracking remains in `translation.lock.json`. The five
additional languages use `localization.lock.json`, which records the actual Chinese
or English source path and its hash for each page and UI message file. Do not edit
either lockfile by hand or mark untranslated content as current.

After translating every affected page and UI message, run from the repository root:

```sh
node scripts/check-locales.mjs --record
pnpm check-consistency
pnpm check
pnpm build
```

`--record` records the reviewed source versions only after structural checks pass.
It does not translate or judge writing quality. CI checks completeness, source
changes, anchors, links, code examples, and interpolation placeholders. Review the
wording separately. Existing English translation lag is reported by the original
translation script and is not cleared by recording other languages.

From the repository root, record only reviewed English pages with
`node scripts/translation-lock.mjs record --source docs/path.md`
(repeat `--source` for multiple pages). After deleting both a source and its
translations, use the same script's `prune` command to remove deleted pairs without
marking unrelated translations as reviewed.
