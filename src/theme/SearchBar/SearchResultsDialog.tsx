import { useEffect, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { usePluralForm } from "@docusaurus/theme-common";
import { fetchIndexesByWorker, searchByWorker, type SearchResult } from "@theme/searchByWorker";
import { highlight } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/highlight";
import { highlightStemmed } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/highlightStemmed";
import { getStemmedPositions } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/getStemmedPositions";

// 插件 SearchDocumentType 的取值：0 标题、1 小节标题、2 描述、3 关键词、4 正文。
const TITLE = 0;
const DESCRIPTION = 2;
const KEYWORDS = 3;
const CONTENT = 4;
const RESULT_LIMIT = 100;

type Props = {
  query: string;
  onClose: () => void;
};

/**
 * 「查看全部结果」的弹窗版。插件原本跳到 /search 页，那页没有侧栏，左上角的字标又链到官网，
 * 读者除了浏览器后退键回不到文档；弹窗关掉就回到原处。取数与结果写法照插件 SearchPage。
 */
export default function SearchResultsDialog({ query: initialQuery, onClose }: Props): ReactNode {
  const {
    siteConfig: { baseUrl },
  } = useDocusaurusContext();
  const { selectMessage } = usePluralForm();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(initialQuery);
  // 结果连同它对应的查询词一起存：输入变了、新结果还没回来时不显示旧结果。
  const [found, setFound] = useState<{ query: string; results: SearchResult[] }>();
  const results = found && found.query === query.trim() ? found.results : undefined;

  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    inputRef.current?.focus();
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocused?.isConnected) previouslyFocused.focus();
    };
  }, [onClose]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) return;
    let cancelled = false;
    void (async () => {
      await fetchIndexesByWorker(baseUrl, "");
      const results = await searchByWorker(baseUrl, "", trimmed, RESULT_LIMIT);
      if (!cancelled) setFound({ query: trimmed, results });
    })();
    return () => {
      cancelled = true;
    };
  }, [baseUrl, query]);

  const title = query.trim()
    ? translate(
        {
          id: "theme.SearchPage.existingResultsTitle",
          message: 'Search results for "{query}"',
          description: "The search page title for non-empty query",
        },
        { query: query.trim() },
      )
    : translate({
        id: "theme.SearchPage.emptyResultsTitle",
        message: "Search the documentation",
        description: "The search page title for empty query",
      });
  const closeLabel = translate({
    id: "theme.SearchResultsDialog.close",
    message: "关闭搜索结果",
    description: "The ARIA label for closing the full search results dialog",
  });
  const inputLabel = translate({
    id: "theme.SearchBar.label",
    message: "Search",
    description: "The ARIA label and placeholder for search button",
  });

  return (
    // 点遮罩关闭只是鼠标的便捷方式，键盘有 Esc 和关闭按钮，所以遮罩本身按展示元素处理。
    <div
      className="docsSearchBackdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="docsSearchDialog" role="dialog" aria-modal="true" aria-labelledby="docs-search-dialog-title">
        <div className="docsSearchDialogHeader">
          <h2 id="docs-search-dialog-title">{title}</h2>
          <button className="docsSearchDialogClose" type="button" onClick={onClose} aria-label={closeLabel}>
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <input
          ref={inputRef}
          className="docsSearchDialogInput"
          type="search"
          value={query}
          placeholder={inputLabel}
          aria-label={inputLabel}
          autoComplete="off"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
        />
        {results && (
          <p className="docsSearchDialogCount">
            {results.length > 0
              ? selectMessage(
                  results.length,
                  translate(
                    {
                      id: "theme.SearchPage.documentsFound.plurals",
                      message: "1 document found|{count} documents found",
                      description:
                        'Pluralized label for "{count} documents found". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
                    },
                    { count: results.length },
                  ),
                )
              : translate({
                  id: "theme.SearchPage.noResultsText",
                  message: "No documents were found",
                  description: "The paragraph for empty search result",
                })}
          </p>
        )}
        <div className="docsSearchDialogResults">
          {results?.map((result) => (
            <SearchResultItem key={result.document.i} result={result} onOpen={onClose} />
          ))}
        </div>
      </section>
    </div>
  );
}

function SearchResultItem({ result, onOpen }: { result: SearchResult; onOpen: () => void }): ReactNode {
  const { document, type, page, tokens, metadata } = result;
  const isTitle = type === TITLE;
  const isDescriptionOrKeywords = type === DESCRIPTION || type === KEYWORDS;
  const isContent = type === CONTENT;
  const pathItems = [...((isTitle ? document.b : page?.b) ?? [])];
  if (!isTitle && !isDescriptionOrKeywords && page) pathItems.push(page.t);
  const articleTitle = (isContent || isDescriptionOrKeywords ? document.s : document.t) ?? "";
  const params = new URLSearchParams();
  for (const token of tokens) params.append("_highlight", token);
  const search = tokens.length > 0 ? `?${params.toString()}` : "";

  return (
    <article className="docsSearchDialogResult">
      <h3>
        <Link
          to={document.u + search + (document.h ?? "")}
          onClick={onOpen}
          dangerouslySetInnerHTML={{
            __html:
              isContent || isDescriptionOrKeywords
                ? highlight(articleTitle, tokens)
                : highlightStemmed(articleTitle, getStemmedPositions(metadata, "t"), tokens, 100),
          }}
        />
      </h3>
      {pathItems.length > 0 && <p className="docsSearchDialogResultPath">{pathItems.join(" › ")}</p>}
      {(isContent || type === DESCRIPTION) && (
        <p
          className="docsSearchDialogResultSummary"
          dangerouslySetInnerHTML={{
            __html: highlightStemmed(document.t, getStemmedPositions(metadata, "t"), tokens, 100),
          }}
        />
      )}
    </article>
  );
}
