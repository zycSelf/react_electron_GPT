import React from 'react';
import { createRoot } from 'react-dom/client';
import { store } from './util/redux/store';
import { Provider } from 'react-redux';
import DraggableGPT from './components/gpt';
const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<Provider store={store}>
		<DraggableGPT />
	</Provider>,
);
