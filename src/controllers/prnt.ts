import { Region, screen } from '@nut-tree/nut-js'
import Jimp from 'jimp'

const prntCommands: CommandsTable = {
  scrn: async ({ rawCommand }, { commandPrefix }) => {
    console.log(commandPrefix, rawCommand)
    const image = await screen.grabRegion(new Region(100, 100, 200, 200))
    const img = new Jimp(image)
    const res = await img.getBufferAsync(Jimp.MIME_PNG)

    return `prnt_scrn ${res.toString('base64')}`
  }
}

export default prntCommands
