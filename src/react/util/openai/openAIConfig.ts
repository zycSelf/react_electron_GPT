import { testData } from '../../api/openAIApi';
const stream = true;
export const OpenAIAPIConfig = {
	apiKey: process.env.REACT_APP_API_KEY, //openai API key
	stream: stream,
	chatApi: {
		config: {
			model: 'gpt-3.5-turbo',
			// max_tokens: 400,
			stream: stream,
		},
	},
};
