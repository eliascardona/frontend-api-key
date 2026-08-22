import { GenericPageHeader } from './components/page-header/component.js';
import { renderErrorBoundary } from './components/error-boundary/component.js';

import { RequestButtons } from './components/request-buttons/component.js';

function renderApp() {
  const app = document.getElementById('app');

  if (!app) {
    throw new Error('Application root element was not found.');
  }

  console.log(app);

  const main = document.createElement('main');

  main.appendChild(GenericPageHeader());

  const content = document.createElement('div');
  content.classList.add('grid')
  content.classList.add('mx-auto')

  content.appendChild(RequestButtons());
  main.appendChild(content);

  app.replaceChildren(main);
}

function bootstrap() {
  try {
    renderApp();
  } catch (error) {
    renderErrorBoundary(error);
  }
}

// window.addEventListener('error', (event) => {
//   event.preventDefault();
//   renderErrorBoundary(event.error);
// });

// window.addEventListener('unhandledrejection', (event) => {
//   event.preventDefault();
//   renderErrorBoundary(event.reason);
// });

bootstrap();