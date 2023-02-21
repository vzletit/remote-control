import { httpServer } from './http_server/index.js'
import { WebSocketServer, createWebSocketStream } from 'ws'
import controllersMap from './controllers/index.js'
import parseInputData from './utils/parseInputData.js'
import render from './utils/render.js'

const webSocketPort = 8080
const HTTP_PORT = 8181
const mouseSpeed = 400

const app = () => {
  render(`Http server launched on the ${HTTP_PORT} port. Try open http://localhost:${HTTP_PORT} in browser`, { mode: 'info' })
  httpServer.listen(HTTP_PORT)

  const wss = new WebSocketServer({ port: webSocketPort })
  render(`WebSocket Server launched on port ${webSocketPort}`, { mode: 'info' })

  process.on('SIGINT', () => {
    wss.close()
    render('WebSocket server closed')
    httpServer.close()
    render('HTTP server closed')
  })

  wss.on('connection', async (ws) => {
    const stream = createWebSocketStream(ws, { decodeStrings: false })

    // setTimeout used for 'correct' order of disconnect/connect events messages when user refreshes page in browser
    setTimeout(() => {
      render('++ Client connected', { mode: 'info' })
      render('Internal duplex stream launched. Waiting for commands...', { mode: 'info' })
    }, 500)

    stream.on('data', async (chunk) => {
      const rawCommand: string = chunk.toString()
      render(`-> ${rawCommand}`, { mode: 'info' })
      const { controller, command, args } = parseInputData(rawCommand)

      try {
        const result = await controllersMap[controller][command]({ ...args, mouseSpeed })
        render(result, { mode: 'reply' })
        stream.write(result)
      } catch (err) {
        render(rawCommand, { mode: 'handleError' })
      }
    })

    stream.on('error', async () => { render('Internal stream error', { mode: 'socketError' }) })

    ws.on('error', async () => { render('Socket connection error', { mode: 'socketError' }) })
    ws.on('close', async () => { render('-- Client disconnected', { mode: 'info' }) })
  })
}

export default app
