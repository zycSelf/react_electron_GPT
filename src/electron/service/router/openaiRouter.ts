import express from 'express';
const openAIRouter = express.Router() as any;
import { getChatStream, getChatJson } from '../api/chat';
import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });
import expressWS from 'express-ws';
import { fileToString } from '../util';
expressWS(openAIRouter);
openAIRouter.ws('/WS', (ws: any, req: any) => {
	ws.on('close', () => {
		ws.send(
			JSON.stringify({
				type: 'close',
				data: null,
			}),
		);
	});
	ws.on('error', (err: Error) => {
		ws.send(
			JSON.stringify({
				type: 'error',
				data: err,
			}),
		);
		ws.close();
	});
	ws.on('message', (data: any) => {
		const subscribeData = JSON.parse(data);
		getChatStream(subscribeData, ws);
	});
});

openAIRouter.post('/chat', async (req: any, res: any) => {
	try {
		const json = await getChatJson(req);
		console.log(json);
		res.send(json);
	} catch (error) {
		console.log(error);
	}
});
openAIRouter.post(
	'/fileConversion',
	upload.single('file'),
	async (req: any, res: any) => {
		try {
			const json = await fileToString(req.file);
			console.log(json);
			res.send(
				JSON.stringify({
					fileConversion: json,
				}),
			);
		} catch (error) {
			// console.log(error);
		}
	},
);

export { openAIRouter };
