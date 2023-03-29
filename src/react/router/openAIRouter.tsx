import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
const Chat = lazy(() => import('../components/page/chat/chat'));
export const OpenAIRouter = (
	<Routes>
		<Route path={'/'} element={<div>root</div>}></Route>
		<Route path={'openAI/'}>
			<Route
				path={'chat'}
				element={
					<Suspense fallback={<div>loading</div>}>
						<Chat />
					</Suspense>
				}></Route>
		</Route>
	</Routes>
);
