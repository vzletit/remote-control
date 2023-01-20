import { WebSocketServer, createWebSocketStream } from 'ws';
import controllersMap from './controllers/index.js';
import parseInputData from './utils/parseInputData.js';
const webSocketPort = 8080;
const mouseSpeed = 400;
const commandPrefix = '-> ';
const wsIO = () => {
    const wss = new WebSocketServer({ port: webSocketPort });
    console.log(`+ WebSocket Server created on port ${webSocketPort}.`);
    wss.on('connection', async (ws) => {
        console.log('>>  Client connected.');
        const stream = createWebSocketStream(ws, { decodeStrings: false });
        console.log('    Internal duplex stream created. Waiting for commands...');
        stream.on('data', async (chunk) => {
            const rawCommand = chunk.toString();
            const { controller, command, args } = parseInputData(rawCommand);
            try {
                const result = await controllersMap[controller][command](args, { mouseSpeed, commandPrefix });
                stream.write(result);
            }
            catch (err) {
                console.log(`!!!  Failed processing "${rawCommand}". Either unknown command or handler error.`);
            }
        });
        ws.on('error', async () => { console.log('Socket connection error'); });
        ws.on('close', async () => { console.log('<<  Client disconnected'); });
    });
};
export default wsIO;
