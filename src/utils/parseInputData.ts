const parseInputData = (rawCommand: string): parsedInput => {
  const commandArr = rawCommand.split(' ')

  return {    
    command: commandArr[0],
    args: {
      raw: rawCommand,
      arg1: rawCommand.split(' ')[1],
      arg2: rawCommand.split(' ')[2]
    }
  }
}

export default parseInputData
