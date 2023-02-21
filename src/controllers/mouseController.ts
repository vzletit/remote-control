import { mouse, Point } from '@nut-tree/nut-js'

const mouseCommands: CommandsTable = {
  position: async () => {
    const mPos = await mouse.getPosition()
    return `mouse_position ${mPos.x},${mPos.y}`
  },

  up: async ({ arg1 }) => {
    const offset = Number(arg1)
    const pos = await mouse.getPosition()
    const target = new Point(pos.x, pos.y - offset)
    await mouse.setPosition(target)

    return 'mouse_up'
  },

  down: async ({ arg1 }) => {
    const offset = Number(arg1)
    const pos = await mouse.getPosition()
    const target = new Point(pos.x, pos.y + offset)
    await mouse.setPosition(target)
    return 'mouse_down'
  },

  left: async ({ arg1 }) => {
    const offset = Number(arg1)
    const pos = await mouse.getPosition()
    const target = new Point(pos.x - offset, pos.y)
    await mouse.setPosition(target)

    return 'mouse_left'
  },

  right: async ({ arg1 }) => {
    const offset = Number(arg1)
    const pos = await mouse.getPosition()
    const target = new Point(pos.x + offset, pos.y)
    await mouse.setPosition(target)

    return 'mouse_right'
  }
}

export default mouseCommands
