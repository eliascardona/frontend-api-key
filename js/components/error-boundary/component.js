export function renderErrorBoundary(error) {
  const app = document.getElementById('app');

  if (!app) {
    document.body.innerHTML = '';
    return;
  }

  let message = 'Oops!';
  let details = 'An unexpected error occurred.';

  if (isNotFoundError(error)) {
    message = '404';
    details = 'The requested page could not be found.';
  } else if (import.meta.env?.DEV && error instanceof Error) {
    details = error.message;
  }

  const main = document.createElement('main');
  main.className = 'container mx-auto p-4 pt-16';

  const heading = document.createElement('h1');
  heading.textContent = message;

  const paragraph = document.createElement('p');
  paragraph.textContent = details;

  main.appendChild(heading);
  main.appendChild(paragraph);

  if (import.meta.env?.DEV && error instanceof Error && error.stack) {
    const pre = document.createElement('pre');
    pre.className = 'w-full overflow-x-auto p-4';

    const code = document.createElement('code');
    code.textContent = error.stack;

    pre.appendChild(code);
    main.appendChild(pre);
  }

  app.replaceChildren(main);
}

function isNotFoundError(error) {
  return error instanceof Error && error.status === 404;
}