import { WebSocketServer, createWebSocketStream } from 'ws';
import commandsHandler from './controllers/commandsHandler.js';
import parseInputData from './utils/parseInputData.js';
const webSocketPort = 8080;
const wsIO = () => {
    const wss = new WebSocketServer({ port: webSocketPort });
    console.log(`+ WebSocket Server created on port ${webSocketPort}`);
    wss.on('connection', async (ws) => {
        console.log('>>  Client connected.');
        const stream = createWebSocketStream(ws, { decodeStrings: false });
        console.log('Internal duplex stream created');
        stream.on('data', async (message) => {
            const { command, args } = parseInputData(message.toString());
            try {
                const result = await commandsHandler[command](args);
                stream.write(result);
            }
            catch (err) {
                console.log(`!!!  Failed processing "${command}". Either unknown command or handler error.`);
            }
        });
        ws.on('error', async () => { console.log('Socket connection error'); });
        ws.on('close', async () => { console.log('<<  Client disconnected'); });
    });
    // wss.clients.forEach((socket) => {
    //   socket.close()
    // })
};
export default wsIO;
