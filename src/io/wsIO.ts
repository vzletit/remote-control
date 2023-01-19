/* eslint-disable @typescript-eslint/no-misused-promises */
import { WebSocketServer, createWebSocketStream } from 'ws'
import commandsHandler from '../controllers/commandsHandler.js'
import parseInputData from '../utils/parseInputData.js'

const wsIO = () => {
  const wss = new WebSocketServer({ port: 8080 })

  wss.on('connection', async (ws) => {
    
    const stream = createWebSocketStream(ws, { decodeStrings: false })

    stream.on('data', async (message) => {
      const { command, args } = parseInputData(message.toString())
      const result = await commandsHandler[command](args)
      stream.write(result)
    })
  })

  wss.clients.forEach((socket) => {
    socket.close()
  })
}
export default wsIO
