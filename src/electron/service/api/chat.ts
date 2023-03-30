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
	try {
		const openai = getOpenAI(subscribeData.apiKey);
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
					ws.send(
						JSON.stringify({
							type: 'chat',
							data: parsed,
						}),
					);
				} catch (error) {
					throw new Error('Could not JSON parse stream message');
				}
			}
		});
	} catch (error) {
		ws.send(
			JSON.stringify({
				type: 'error',
				data: error,
			}),
		);
	}
};

const getChatJson = async (request: any) => {
	const openai = getOpenAI(request.headers.authorization);
	const openaiResult = await openai.createChatCompletion(request.body);
	return openaiResult.data;
};
export { getChatStream, getChatJson };
