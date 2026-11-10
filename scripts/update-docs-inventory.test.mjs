import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";

const script = resolve(import.meta.dirname, "update-docs-inventory.mjs");

function withRepo(files, run) {
  const root = mkdtempSync(join(tmpdir(), "zaidrama-update-docs-"));
  try {
    for (const [path, content] of Object.entries(files)) {
      const absolutePath = join(root, path);
      mkdirSync(resolve(absolutePath, ".."), { recursive: true });
      writeFileSync(absolutePath, content, "utf8");
    }
    run(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function frontmatter(value) {
  return `---\nid: fixture\nupdate_docs: ${value}\n---\n\n# Fixture {#fixture}\n`;
}

const responsibilities = (paths) => `
### 各页职责

| 页面 | 应该包含 | 不应该包含 |
|---|---|---|
${paths.map((path) => `| \`${path}\` | yes | no |`).join("\n")}

### 写作约定
`;

test("CLI derives engine ownership from page frontmatter and reports explicit none", () => {
  withRepo(
    {
      "docs/a.md": frontmatter("engine-a"),
      "docs/nested/b.mdx": frontmatter("engine-b"),
      "docs/ignored.md": frontmatter("none"),
      "CONTRIBUTING.md": responsibilities(["docs/a.md", "docs/nested/b.mdx", "docs/ignored.md"]),
    },
    (root) => {
      const output = execFileSync(process.execPath, [script, "--root", root, "--format", "tsv"], {
        encoding: "utf8",
      });
      assert.equal(
        output,
        ["engine-a\tdocs/a.md", "none\tdocs/ignored.md", "engine-b\tdocs/nested/b.mdx", ""].join("\n"),
      );
    },
  );
});

test("CLI fails loud when a published page has no update-docs declaration", () => {
  withRepo(
    {
      "docs/declared.md": frontmatter("engine-b"),
      "docs/undeclared.md": "---\nid: missing\n---\n",
      "CONTRIBUTING.md": responsibilities(["docs/declared.md", "docs/undeclared.md"]),
    },
    (root) => {
      assert.throws(
        () => execFileSync(process.execPath, [script, "--root", root], { encoding: "utf8", stdio: "pipe" }),
        (error) => error.stderr.includes("docs/undeclared.md 未声明 frontmatter 的 update_docs"),
      );
    },
  );
});

test("CLI reports pages missing from and stale in the responsibilities table", () => {
  withRepo(
    {
      "docs/actual.md": frontmatter("engine-b"),
      "CONTRIBUTING.md": responsibilities(["docs/stale.md"]),
    },
    (root) => {
      assert.throws(
        () => execFileSync(process.execPath, [script, "--root", root], { encoding: "utf8", stdio: "pipe" }),
        (error) => {
          assert.match(error.stderr, /各页职责缺少：docs\/actual\.md/);
          assert.match(error.stderr, /各页职责多出：docs\/stale\.md/);
          return true;
        },
      );
    },
  );
});

test("CLI ignores table-like responsibility rows inside fenced examples", () => {
  withRepo(
    {
      "docs/actual.md": frontmatter("engine-b"),
      "CONTRIBUTING.md": responsibilities(["docs/actual.md"]).replace(
        "\n### 写作约定",
        "\n```md\n| `docs/example-only.md` | yes | no |\n```\n\n### 写作约定",
      ),
    },
    (root) => {
      assert.doesNotThrow(() =>
        execFileSync(process.execPath, [script, "--root", root], { encoding: "utf8", stdio: "pipe" }),
      );
    },
  );
});
