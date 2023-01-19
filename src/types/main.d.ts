type CommandsTable = Record<string, (args: ArgsObject) => Promise<string>>

interface parsedInput {
  
  command: string
  args: ArgsObject
}

type Command = string

interface ArgsObject {
  raw: string
  arg1: string
  arg2?: string
}
