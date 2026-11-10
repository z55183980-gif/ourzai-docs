// @easyops-cn/docusaurus-search-local 只发 JS，不带类型。这里只声明搜索结果弹窗用到的几个出口，
// 字段含义见插件 shared/interfaces：t 标题/正文、u 地址、h 锚点、s 所在章节、b 面包屑。
declare module "@theme/searchByWorker" {
  export interface SearchDocument {
    i: number;
    t: string;
    u: string;
    h?: string;
    s?: string;
    b?: string[];
  }

  export interface SearchResult {
    document: SearchDocument;
    type: number;
    page?: SearchDocument;
    metadata: Record<string, unknown>;
    tokens: string[];
  }

  export function fetchIndexesByWorker(baseUrl: string, searchContext: string): Promise<void>;
  export function searchByWorker(
    baseUrl: string,
    searchContext: string,
    input: string,
    limit: number,
  ): Promise<SearchResult[]>;
}

declare module "@easyops-cn/docusaurus-search-local/dist/client/client/utils/highlight" {
  export function highlight(content: string, tokens: string[]): string;
}

declare module "@easyops-cn/docusaurus-search-local/dist/client/client/utils/highlightStemmed" {
  export function highlightStemmed(
    content: string,
    positions: [number, number][],
    tokens: string[],
    maxLength?: number,
  ): string;
}

declare module "@easyops-cn/docusaurus-search-local/dist/client/client/utils/getStemmedPositions" {
  export function getStemmedPositions(metadata: Record<string, unknown>, field: string): [number, number][];
}
