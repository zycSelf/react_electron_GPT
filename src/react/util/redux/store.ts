import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import OpenAISlice from './reducer';
import createSagaMiddleware from 'redux-saga';
import mySaga from '../saga/openAISaga';
import { reduxMiddleWare } from './middleware/test';
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
	reducer: {
		openAISlice: OpenAISlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([sagaMiddleware, reduxMiddleWare]),
});
sagaMiddleware.run(mySaga);
export type StoreState = ReturnType<typeof store.getState>;
