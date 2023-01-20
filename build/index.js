import { httpServer } from './http_server/index.js';
import app from './app.js';
const HTTP_PORT = 8181;
console.log(`Http server launched on the ${HTTP_PORT} port. Try open http://localhost:${HTTP_PORT} in browser`);
httpServer.listen(HTTP_PORT);
app();
