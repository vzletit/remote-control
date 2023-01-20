const parseInputData = (rawCommand: string): parsedInput => {
  const [fullCommand, arg1, arg2] = rawCommand.split(' ')
  const [controller, command] = fullCommand.split('_')

  return {
    controller,
    command,
    args: {
      rawCommand,
      arg1,
      arg2
    }
  }
}

export default parseInputData
