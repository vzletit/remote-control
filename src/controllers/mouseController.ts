import { mouse, Point } from '@nut-tree/nut-js'

const mouseCommands: CommandsTable = {
  position: async ({ rawCommand }, { commandPrefix }) => {
    console.log(commandPrefix, rawCommand)
    const mPos = await mouse.getPosition()
    return `mouse_position ${mPos.x},${mPos.y}`
  },

  up: async ({ rawCommand, arg1 }, { commandPrefix, mouseSpeed }) => {
    mouse.config.mouseSpeed = mouseSpeed

    console.log(commandPrefix, rawCommand)
    const offset = Number(arg1)
    const pos = await mouse.getPosition()
    const target = new Point(pos.x, pos.y - offset)
    await mouse.setPosition(target)

    return `mouse_up(${arg1}px)`
  },

  down: async ({ rawCommand, arg1 }, { commandPrefix, mouseSpeed }) => {
    mouse.config.mouseSpeed = mouseSpeed

    console.log(commandPrefix, rawCommand)
    const offset = Number(arg1)
    const pos = await mouse.getPosition()
    const target = new Point(pos.x, pos.y + offset)
    await mouse.setPosition(target)
    return `mouse_down(${arg1}px)`
  },

  left: async ({ rawCommand, arg1 }, { commandPrefix, mouseSpeed }) => {
    mouse.config.mouseSpeed = mouseSpeed

    console.log(commandPrefix, rawCommand)
    const offset = Number(arg1)
    const pos = await mouse.getPosition()
    const target = new Point(pos.x - offset, pos.y)
    await mouse.setPosition(target)

    return `mouse_left(${arg1}px)`
  },

  right: async ({ rawCommand, arg1 }, { commandPrefix, mouseSpeed }) => {
    mouse.config.mouseSpeed = mouseSpeed

    console.log(commandPrefix, rawCommand)
    const offset = Number(arg1)
    const pos = await mouse.getPosition()
    const target = new Point(pos.x + offset, pos.y)
    await mouse.setPosition(target)

    return `mouse_right(${arg1}px)`
  }
}

export default mouseCommands
