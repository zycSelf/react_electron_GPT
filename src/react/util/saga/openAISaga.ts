import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { bindActionCreators } from 'redux';
import { v4 } from 'uuid';
import { ChatParams, OpenAIApi } from '../../api/openAIApi';
import {
	ChatAnswer,
	OpenAIChatChoice,
	setChatResponse,
	setDocumentConversion,
} from '../redux/reducer';
import { OpenAIAPIConfig } from '../openai/openAIConfig';
import { eventChannel } from 'redux-saga';
interface ChatAction {
	payload: ChatParams;
	type: string;
}
interface conversionAction {
	payload: FormData;
	type: string;
}
const connectSocket = ({ subscribeData, eventHandlers }: any) =>
	eventChannel((emitter: any) => {
		const ws = new window.WebSocket('ws://127.0.0.1:8088/openai/WS');
		const boundEventHandlers = bindActionCreators(eventHandlers, emitter);
		console.log(boundEventHandlers);
		ws.onopen = (e) => {
			ws.send(JSON.stringify(subscribeData));
		};
		// ws.onclose = boundEventHandlers.onclose
		// ws.onerror = boundEventHandlers.onerror
		ws.onmessage = boundEventHandlers.onmessage;
		return ws.close;
	});

function* fetchOpenAIChat(action: ChatAction): ReturnType<any> {
	try {
		const chatParams = {
			...action.payload,
			...OpenAIAPIConfig.chatApi.config,
		};
		if (chatParams.stream) {
			const socketChannel = yield call(connectSocket, {
				subscribeData: {
					type: 'chat',
					apiKey: `Bearer ${OpenAIAPIConfig.apiKey}`,
					payload: chatParams,
				},
				eventHandlers: {
					onmessage: (wsObj: any) => {
						const response = JSON.parse(wsObj.data);
						return setChatResponse({
							...response,
							id: v4(),
							choices: response.choices.map((choice: OpenAIChatChoice) => {
								return {
									...choice,
									answerId: v4(),
								};
							}),
						});
					},
				},
			});
			while (true) {
				const eventAction = yield take(socketChannel);
				yield put(eventAction);
			}
		} else {
			const chatResponse = yield call(OpenAIApi.chat, chatParams);
			const data = chatResponse.data;
			yield put(
				setChatResponse({
					...data,
					id: v4(),
					choices: data.choices.map((choice: OpenAIChatChoice) => {
						return {
							...choice,
							answerId: v4(),
						};
					}),
				}),
			);
		}
	} catch (err) {
		console.error(err);
	}
}

function* fetchConversion(action: conversionAction): ReturnType<any> {
	try {
		console.log(action);
		const file = action.payload;
		const response = yield call(OpenAIApi.fileConversion, file);
		console.log(response.data);
		yield put(
			setDocumentConversion({
				fileConversion: response.data.fileConversion,
			}),
		);
	} catch (err) {
		console.error(err);
	}
}

function* mySaga() {
	yield takeLatest('OpenAIChat', fetchOpenAIChat);
	yield takeLatest('FileConversion', fetchConversion);
}

export default mySaga;
