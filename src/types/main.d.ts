type CommandsTable = Record<string, (arg: Args) => Promise<string>>

interface parsedInput {
  command: string
  args: Args
}

type Command = string
interface Args {
  arg1: string
  arg2?: string
}
