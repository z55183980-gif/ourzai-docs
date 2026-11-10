import { useCallback, useEffect, useState, type ComponentProps, type ReactNode } from "react";
import { createPortal } from "react-dom";
import SearchBar from "@theme-original/SearchBar";
import SearchResultsDialog from "./SearchResultsDialog";

type Props = ComponentProps<typeof SearchBar>;

/**
 * 包一层插件搜索框：下拉框底部「查看全部结果」不再跳 /search 页，改在当前页开弹窗。
 * 那个链接是插件用 DOM 拼出来的、自己挂了点击跳转，只能在捕获阶段先拦下；
 * Ctrl/⌘ 点击照旧交给浏览器，在新标签页打开整页结果。
 * 弹窗挂到 body 上：导航栏有毛玻璃（backdrop-filter），fixed 定位放在里面会被框在导航栏内。
 */
export default function SearchBarWithResultsDialog(props: Props): ReactNode {
  const [query, setQuery] = useState<string | null>(null);
  const closeDialog = useCallback(() => setQuery(null), []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey) return;
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>(".navbar__search a[href]");
      if (!link || !new URL(link.href).pathname.endsWith("/search/")) return;
      event.preventDefault();
      event.stopPropagation();
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
      setQuery(new URL(link.href).searchParams.get("q") ?? "");
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return (
    <>
      <SearchBar {...props} />
      {query !== null && createPortal(<SearchResultsDialog query={query} onClose={closeDialog} />, document.body)}
    </>
  );
}
