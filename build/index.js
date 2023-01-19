import { httpServer } from './http_server/index.js';
import app from './app.js';
const HTTP_PORT = 8181;
app();
console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
