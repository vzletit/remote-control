import { WebSocketServer, createWebSocketStream } from 'ws';
import controllersMap from './controllers/index.js';
import parseInputData from './utils/parseInputData.js';
import replyRender from './utils/replyRender.js';
import errorRender from './utils/errorRender.js';
const webSocketPort = 8080;
const mouseSpeed = 400;
const commandPrefix = '->';
const replyPrefix = '<-';
const wsIO = () => {
    const wss = new WebSocketServer({ port: webSocketPort });
    console.log(`+ WebSocket Server created on port ${webSocketPort}`);
    wss.on('connection', async (ws) => {
        const stream = createWebSocketStream(ws, { decodeStrings: false });
        console.log('>>  Client connected, internal duplex stream created. Waiting for commands...');
        stream.on('data', async (chunk) => {
            const rawCommand = chunk.toString();
            console.log(`${commandPrefix} ${rawCommand}`);
            const { controller, command, args } = parseInputData(rawCommand);
            try {
                const result = await controllersMap[controller][command](Object.assign(Object.assign({}, args), { mouseSpeed }));
                replyRender(result, replyPrefix);
                stream.write(result);
            }
            catch (err) {
                errorRender(rawCommand);
            }
        });
        ws.on('error', async () => { errorRender('Socket connection error'); });
        ws.on('close', async () => { console.log('<<  Client disconnected'); });
    });
};
export default wsIO;
