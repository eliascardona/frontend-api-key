import {
    getApiData,
    getApiHealth,
    postApiData
} from "../../infrastructure/api-calls.js";

export function RequestButtons() {
    const layout = document.createElement('div');

    const responseArray = [];

    const responsesContainer = document.createElement('div');
    responsesContainer.classList.add('p-4');

    async function getApiHealthWrapper() {
        const response = await getApiHealth();

        responseArray.push(response);
        renderResponses();
    }

    async function getApiDataWrapper() {
        const response = await getApiData();

        responseArray.push(response);
        renderResponses();
    }

    async function postApiDataWrapper() {
        const response = await postApiData();

        responseArray.push(response);
        renderResponses();
    }

    function renderResponses() {
        responsesContainer.replaceChildren();

        if (responseArray.length === 0) {
            return;
        }

        const title = document.createElement('h3');
        title.classList.add('text-lg');
        title.innerText = 'Respuestas de la API';

        const pre = document.createElement('pre');
        pre.innerText = JSON.stringify(
            responseArray.at(-1),
            null,
            2
        );

        responsesContainer.append(title, pre);
    }

    layout.innerHTML = `
        <div class="grid w-3/4 gap-2 justify-self-center"></div>
    `;

    const button1 = Button(
        'GET /api/health',
        getApiHealthWrapper
    );

    const button2 = Button(
        'GET /api/data',
        getApiDataWrapper
    );

    const button3 = Button(
        'POST /api/data',
        postApiDataWrapper
    );

    layout.append(button1, button2, button3, responsesContainer);

    return layout;
}

function Button(
    text,
    onClick = () => {
        console.log('I was clicked, please add a comprehensive callback')
    }
) {
    const button = document.createElement('button');
    button.classList.add('py-2');
    button.classList.add('px-6');
    button.classList.add('my-4');
    button.classList.add('ml-2');
    button.classList.add('border');
    button.classList.add('border-grey-200');
    button.classList.add('rounded-md');
    button.classList.add('bg-grey-100');
    button.innerText = text;

    button.addEventListener('click', onClick)

    return button;
}