import express from 'express';
import { openAIRouter } from './router/openaiRouter';
import expressWS from 'express-ws';
const app = express() as any;
const appWS = expressWS(app);
expressWS(app);
app.ws('/', function (ws: any, req: any) {
	ws.on('message', function (msg: any) {
		console.log(msg);
	});
});
app.use(express.json());
app.use(
	(
		req: { headers: { origin: any } },
		res: { header: (arg0: string, arg1: string) => void },
		next: () => void,
	) => {
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept,Authorization,withcredentials,responseType',
		);
		res.header('Access-Control-Allow-Origin', req.headers.origin);
		res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,OPTIONS');
		next();
	},
);
app.use('/openai', openAIRouter);
app.get('/', (req: any, res: { send: (arg0: string) => void }) => {
	res.send('listening on 8088');
});

export default app;
