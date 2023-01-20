type CommandsTable = Record<string, (args: ArgsObject, config: ConfigObj) => Promise<string>>



interface ConfigObj {
  mouseSpeed: number
  commandPrefix: string
}

interface parsedInput {
  controller: string
  command: string
  args: ArgsObject
}

type Command = string

interface ArgsObject {
  rawCommand: string
  arg1: string
  arg2?: string | undefined
}


interface ControllersMap {
  [key: string]: CommandsTable
}