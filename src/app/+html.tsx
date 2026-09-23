import type { PropsWithChildren } from 'react';

// No ScrollViewStyleReset: the document itself scrolls on web (see plan.md, Architecture).
const GLOBAL_CSS = `
html { background: #f2efe6; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }
body { margin: 0; background: #f2efe6; color: #111111; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
#root { display: flex; flex-direction: column; min-height: 100vh; min-height: 100dvh; overflow-x: clip; }
a { -webkit-tap-highlight-color: transparent; }
:focus:not(:focus-visible) { outline: none; }
:focus-visible { outline: 3px solid #e0341b; outline-offset: 3px; }
::selection { background: #e0341b; color: #111111; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition-duration: 0s !important; animation-duration: 0s !important; scroll-behavior: auto !important; }
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
        <meta name="theme-color" content="#f2efe6" />
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
