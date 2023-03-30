import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { ChatAskItem } from '../../api/openAIApi';
export interface OpenAIApiState {
	openAIConfig: OpenAIApiConfig;
	isChat: {
		status: boolean;
		created: string | number;
	};
	chatList: Array<ChatAsk | ChatAnswer | ChatDocument>;
	document: {
		fileName: string;
		fileConversion: string;
		hasData: boolean;
		status: 'idle' | 'loading' | 'success' | 'error';
	};
}

export interface ChatDocument {
	type: 'document';
	message: Array<DocumentInChat>; //暂定string
}
interface DocumentInChat {
	role: string;
	content: string;
}
export interface ChatAsk {
	type: 'ask';
	id: number | string;
	content: string;
	message: Array<ChatAskItem>; //暂定string
}
export interface ChatAnswer {
	type: 'answer';
	id: number | string;
	created?: number | string;
	status: 'chat' | 'done' | 'error';
	choices: Array<OpenAIChatChoice>;
}
export interface OpenAIApiConfig {
	organization: string;
	apiKey: string;
}
export interface OpenAIChatChoice {
	index: number;
	answerId?: number | string;
	message?: {
		role?: string;
		content?: string;
	};
	delta?: {
		role?: string;
		content?: string;
	};
	finish_reason: string;
}

const initialState: OpenAIApiState = {
	openAIConfig: {
		organization: '',
		apiKey: '',
	},
	chatList: [],
	isChat: {
		status: false,
		created: '',
	},
	document: {
		fileName: '',
		fileConversion: '',
		hasData: false,
		status: 'idle',
	},
};
const openAiSlice = createSlice({
	name: 'openai',
	initialState,
	reducers: {
		setOpenAIConfig: (state, action) => {
			console.log('setOpenAIConfig', action);
			state.openAIConfig = action.payload;
		},
		setChatRequest: (state, action) => {
			console.log('setChatRequest', action);
			state.chatList = state.chatList.concat({
				type: 'ask',
				...action.payload,
			});
		},
		setChatResponse: (state, action) => {
			console.log('setChatResponse', action);
			const answerList = state.chatList.filter(
				(item: ChatAsk | ChatAnswer | ChatDocument) => item.type === 'answer',
			) as Array<ChatAnswer>;
			const hasAnswer: boolean = answerList.some(
				(item: ChatAnswer) => item.created === action.payload.created,
			);
			if (hasAnswer) {
				state.chatList = state.chatList.map(
					(item: ChatAsk | ChatAnswer | ChatDocument) => {
						if (
							item.type === 'ask' ||
							item.type === 'document' ||
							(item.type === 'answer' &&
								item.created !== action.payload.created)
						) {
							return item;
						} else {
							const content =
								(item.choices[0].message?.content
									? item.choices[0].message?.content
									: '') +
								action.payload.choices
									.map((choice: any) => {
										const text = choice.message?.content;
										return text ? text : '';
									})
									.join('');
							return {
								...item,
								choices: [
									{
										...item.choices[0],
										message: {
											...item.choices[0].message,
											content,
										},
									},
								],
							};
						}
					},
				);
			} else {
				state.chatList = state.chatList
					.filter((item) => {
						if ('created' in item) {
							return item.created !== 'startChat';
						} else {
							return item;
						}
					})
					.concat({
						type: 'answer',
						status: 'chat',
						...action.payload,
					});
				state.isChat = {
					...state.isChat,
					created: action.payload.created,
				};
			}
		},
		setDocumentInfo: (state, action) => {
			console.log('setDocumentInfo', action);
			state.document = {
				...state.document,
				fileName: action.payload.fileName,
				status: 'loading',
			};
		},
		setDocumentConversion: (state, action) => {
			console.log('setDocumentConversion', action.payload);
			(state.chatList = state.chatList
				.filter((chat) => chat.type !== 'document')
				.concat({
					type: 'document',
					message: [
						{
							role: 'user',
							content: `上传的文档的信息为：${action.payload.fileConversion}`,
						},
					],
				})),
			(state.document = {
				...state.document,
				fileConversion: action.payload.fileConversion,
				status: 'success',
			});
		},
		chatStart: (state) => {
			console.log('startChat');
			state.chatList = state.chatList.concat({
				type: 'answer',
				id: v4(),
				created: 'startChat',
				status: 'chat',
				choices: [],
			});
			state.isChat = {
				status: true,
				created: 'startChat',
			};
		},
		chatStop: (state) => {
			state.chatList.map((item: ChatAsk | ChatAnswer | ChatDocument) => {
				if (item.type === 'answer' && item.created === state.isChat.created) {
					return {
						...item,
						status: 'done',
					};
				} else {
					return item;
				}
			});
			state.isChat = {
				status: false,
				created: '',
			};
		},
		chatError: (state) => {
			console.log('chatError');
			state.chatList = state.chatList.map(
				(item: ChatAsk | ChatAnswer | ChatDocument) => {
					if (item.type === 'answer' && item.created === state.isChat.created) {
						return {
							...item,
							created: v4(),
							status: 'error',
						};
					} else {
						return item;
					}
				},
			);
			state.isChat = {
				status: false,
				created: '',
			};
		},
	},
});

export const {
	setOpenAIConfig,
	setChatRequest,
	setChatResponse,
	setDocumentInfo,
	setDocumentConversion,
	chatStart,
	chatStop,
	chatError,
} = openAiSlice.actions;
export default openAiSlice.reducer;
