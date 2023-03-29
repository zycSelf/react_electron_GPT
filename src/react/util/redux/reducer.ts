import { createSlice } from '@reduxjs/toolkit';
import { ChatAskItem } from '../../api/openAIApi';
export interface OpenAIApiState {
	openAIConfig: OpenAIApiConfig;
	chatList: Array<ChatAsk | ChatAnswer>;
	chatError: {
		message: string;
	};
	document: {
		fileName: string;
		fileConversion: string;
		hasData: boolean;
		status: 'idle' | 'loading' | 'success' | 'error';
	};
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
	chatError: {
		message: 'error',
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
				(item: ChatAsk | ChatAnswer) => item.type === 'answer',
			) as Array<ChatAnswer>;
			const hasAnswer: boolean = answerList.some(
				(item: ChatAnswer) => item.created === action.payload.created,
			);
			if (hasAnswer) {
				state.chatList = state.chatList.map((item: ChatAsk | ChatAnswer) => {
					if (
						item.type === 'ask' ||
						(item.type === 'answer' && item.created !== action.payload.created)
					) {
						return item;
					} else {
						return {
							...item,
							choices: item.choices.concat(action.payload.choices),
						};
					}
				});
			} else {
				state.chatList = state.chatList.concat({
					type: 'answer',
					...action.payload,
				});
			}
		},
		setChatError: (state, action) => {
			console.log('setChatError', action);
			state.chatError = action.payload;
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
			console.log('setDocumentConversion', action);
			state.document = {
				...state.document,
				fileConversion: action.payload.fileConversion,
				status: 'success',
			};
		},
	},
});

export const {
	setOpenAIConfig,
	setChatRequest,
	setChatResponse,
	setChatError,
	setDocumentInfo,
	setDocumentConversion,
} = openAiSlice.actions;
export default openAiSlice.reducer;
