
const reply = (data: string) => {
  const prefix: string = '<-'
  const separator = ' '

  const result = data.includes(separator, 1)
    ? data.split(separator)[0]
    : data

  return prefix !== undefined
    ? `${prefix} ${result}`
    : result
}

const info = (data: string) => data

const handleError = (command: string) => `\x1b[31mFailed processing "${command}". Either unknown command or handler error \x1b[0m`
const socketError = () => '\x1b[31mSocket connection error \x1b[0m'

export default (data: string, options = { mode: 'info' }): void => {
  const { mode }: { mode: string } = options

  const renderByMode: RenderByMode = {
    info,
    reply,
    handleError,
    socketError
  }

  console.log(renderByMode[mode](data))
}
