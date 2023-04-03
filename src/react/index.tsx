import React from 'react';
import { createRoot } from 'react-dom/client';
import { store } from './util/redux/store';
import { Provider } from 'react-redux';
import DraggableGPT from './components/gpt';
import { HashRouter } from 'react-router-dom';
import { OpenAIRouter } from './router/openAIRouter';
const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<Provider store={store}>
		<HashRouter>{OpenAIRouter}</HashRouter>
	</Provider>,
);
