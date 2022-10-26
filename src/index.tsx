import {StrictMode} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {App} from './App';

function createReactRoot (elementId: string): Root {
    const rootElement: HTMLElement | null = document.getElementById(elementId);

    if (rootElement === null) {
        throw new Error(`An element with an id of ${elementId} does not exist in the document`);
    }

    return createRoot(rootElement);
}

createReactRoot('root').render(
    <StrictMode>
        <App />
    </StrictMode>
);

