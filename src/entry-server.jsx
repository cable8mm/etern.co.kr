import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import i18n from './i18n';

export function render(url, lang) {
  // Synchronously switch translation language before render
  i18n.changeLanguage(lang);

  const html = renderToString(
    <StrictMode>
      <App ssrPath={url} />
    </StrictMode>,
  );

  return { html };
}
