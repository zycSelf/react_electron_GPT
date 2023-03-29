import { Configuration, OpenAIApi } from 'openai';
const getOpenAI = (authorization: any) => {
	const apiKey = authorization.split('Bearer ')[1];
	const config = new Configuration({
		apiKey: apiKey,
	});
	const openai = new OpenAIApi(config);
	return openai;
};

const getChatStream = async (subscribeData: any, ws: any) => {
	const openai = getOpenAI(subscribeData.apiKey);
	try {
		const openaiResult = (await openai.createChatCompletion(
			subscribeData.payload,
			{ responseType: 'stream' },
		)) as any;
		openaiResult.data.on('data', (data: any) => {
			const lines = data
				.toString()
				.split('\n')
				.filter((line: any) => line.trim() !== '');
			for (const line of lines) {
				const message = line.replace(/^data: /, '');
				if (message === '[DONE]') {
					console.log('done');
					ws.close();
					return; // Stream finished
				}
				try {
					const parsed = JSON.parse(message);
					ws.send(JSON.stringify(parsed));
				} catch (error) {
					console.error('Could not JSON parse stream message', message, error);
				}
			}
		});
	} catch (error) {
		console.log(error);
	}
};

const getChatJson = async (request: any) => {
	const openai = getOpenAI(request.headers.authorization);
	const openaiResult = await openai.createChatCompletion(request.body);
	return openaiResult.data;
};
export { getChatStream, getChatJson };
