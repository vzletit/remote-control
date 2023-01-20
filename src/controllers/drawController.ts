import { mouse, left, right, up, down, straightTo, Point } from '@nut-tree/nut-js'

const drawCommands: CommandsTable = {

  circle: async ({ rawCommand, arg1 }, { commandPrefix, mouseSpeed }) => {
    mouse.config.mouseSpeed = mouseSpeed

    console.log(commandPrefix, rawCommand)
    const pos = await mouse.getPosition()
    const r = Number(arg1)

    const steps = 100

    for (let i = 0; i < steps; i++) {
      const xVal = (pos.x + r * Math.cos(2 * Math.PI * i / steps))
      const yVal = (pos.y + r * Math.sin(2 * Math.PI * i / steps))

      await mouse.move(straightTo(new Point(xVal, yVal)))
      if (i === 0) { await mouse.pressButton(0) }
    }
    await mouse.releaseButton(0)

    return `draw_circle(r:${arg1}px)`
  },

  square: async ({ rawCommand, arg1 }, { commandPrefix, mouseSpeed }) => {
    mouse.config.mouseSpeed = mouseSpeed

    console.log(commandPrefix, rawCommand)
    const sideLength = Number(arg1)
    await mouse.pressButton(0)
    await mouse.move(right(sideLength))
    await mouse.move(down(sideLength))
    await mouse.move(left(sideLength))
    await mouse.move(up(sideLength))
    await mouse.releaseButton(0)

    return `draw_square(${arg1}px)`
  },

  rectangle: async ({ rawCommand, arg1, arg2 }, { commandPrefix, mouseSpeed }) => {
    mouse.config.mouseSpeed = mouseSpeed

    console.log(commandPrefix, rawCommand)
    const sideLengthX = Number(arg1)
    const sideLengthY = Number(arg2)
    await mouse.pressButton(0)
    await mouse.move(right(sideLengthX))
    await mouse.move(down(sideLengthY))
    await mouse.move(left(sideLengthX))
    await mouse.move(up(sideLengthY))
    await mouse.releaseButton(0)

    return `draw_rectangle(${arg1}x${arg2 ?? ''}px)`
  }
}

export default drawCommands
