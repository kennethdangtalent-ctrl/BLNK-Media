import type { PropsWithChildren } from 'react';

// No ScrollViewStyleReset: the document itself scrolls on web (see plan.md, Architecture).
const GLOBAL_CSS = `
html { background: #0d0d0d; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; scrollbar-color: #5c0d12 #efeee9; }
body { margin: 0; background: #efeee9; color: #0d0d0d; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; caret-color: #0d0d0d; }
#root { display: flex; flex-direction: column; min-height: 100vh; min-height: 100dvh; overflow-x: clip; }
a { -webkit-tap-highlight-color: transparent; text-underline-offset: 0.18em; text-decoration-thickness: 2px; }
:focus:not(:focus-visible) { outline: none; }
:focus-visible { outline: 3px solid #c1001f; outline-offset: 4px; }
::selection { background: #c1001f; color: #ffffff; }
::-webkit-scrollbar { width: 14px; height: 14px; }
::-webkit-scrollbar-track { background: #efeee9; }
::-webkit-scrollbar-thumb { background: #5c0d12; border: 3px solid #efeee9; }
@media (prefers-reduced-motion: reduce) {
  :not([data-motionsafe], [data-motionsafe] *), :not([data-motionsafe], [data-motionsafe] *)::before, :not([data-motionsafe], [data-motionsafe] *)::after { transition-duration: 0s !important; animation-duration: 0s !important; scroll-behavior: auto !important; }
}
`;

/** Web-only document shell. Runs in Node during static rendering, never in the browser. */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#efeee9" />
        <meta name="color-scheme" content="light" />
        <meta property="og:site_name" content="BLNK Media" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
