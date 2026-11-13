import { useEffect, useState, type ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.css";

const pages = ["claude", "codex", "keys"] as const;
type Page = (typeof pages)[number];

export default function KeyToolDownload({
  children,
  keysLabel,
  previewLabel,
}: {
  children: ReactNode;
  keysLabel: string;
  previewLabel: string;
}) {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const [active, setActive] = useState<Page>("claude");
  const [automatic, setAutomatic] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const directory = `/img/key-tool/${currentLocale === "zh-Hans" ? "" : "en/"}`;
  const label = (page: Page) => (page === "keys" ? keysLabel : page === "claude" ? "Claude" : "Codex");

  useEffect(() => {
    if (!automatic || hovered || focused) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setInterval(() => {
      if (!document.hidden && !motion.matches) {
        setActive((current) => pages[(pages.indexOf(current) + 1) % pages.length]);
      }
    }, 5000);
    return () => window.clearInterval(timer);
  }, [automatic, hovered, focused]);

  return (
    <div className={styles.download}>
      <div className={styles.links}>{children}</div>
      <div
        className={styles.preview}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
        }}
      >
        {pages.map((page) => (
          <div
            key={page}
            id={`keytool-panel-${page}`}
            role="tabpanel"
            aria-labelledby={`keytool-tab-${page}`}
            hidden={active !== page}
            tabIndex={0}
            className={styles.screen}
          >
            <img src={`${directory}${page}.png`} alt={label(page)} width="560" height="914" />
          </div>
        ))}
        <div className={styles.dock} role="tablist" aria-label={previewLabel}>
          {pages.map((page, index) => (
            <button
              key={page}
              id={`keytool-tab-${page}`}
              type="button"
              role="tab"
              aria-controls={`keytool-panel-${page}`}
              aria-selected={active === page}
              tabIndex={active === page ? 0 : -1}
              onClick={() => {
                setAutomatic(false);
                setActive(page);
              }}
              onKeyDown={(event) => {
                const next =
                  event.key === "ArrowRight"
                    ? (index + 1) % pages.length
                    : event.key === "ArrowLeft"
                      ? (index + pages.length - 1) % pages.length
                      : event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? pages.length - 1
                          : -1;
                if (next < 0) return;
                event.preventDefault();
                setAutomatic(false);
                setActive(pages[next]);
                event.currentTarget.parentElement
                  ?.querySelector<HTMLButtonElement>(`#keytool-tab-${pages[next]}`)
                  ?.focus();
              }}
            >
              {page === "keys" ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="8" cy="8" r="5" />
                  <path d="m12 12 9 9m-4-4 3-3m-6 0 3-3" />
                </svg>
              ) : (
                <img src={`/img/key-tool/${page}.svg`} alt="" width="18" height="18" />
              )}
              <span>{label(page)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
