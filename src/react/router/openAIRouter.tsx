import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
const GPT = lazy(() => import('../components/gpt'));
const AddApiKey = lazy(() => import('../components/page/addApiKey/addApiKey'));
export const OpenAIRouter = (
	<Routes>
		<Route path={'/'} element={<GPT />}></Route>
		<Route
			path={'/addApiKey'}
			element={
				<Suspense fallback={<div>loading</div>}>
					<AddApiKey />
				</Suspense>
			}></Route>
	</Routes>
);
