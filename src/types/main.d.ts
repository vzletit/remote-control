type CommandsTable = Record<string, (args: ArgsObject) => Promise<string>>

interface ConfigObj {
  mouseSpeed: number
  replyPrefix: string
}

interface parsedInput {
  controller: string
  command: string
  args: BaseArgsObject
}

type Command = string

interface BaseArgsObject {
  arg1: string
  arg2?: string | undefined
}

interface ArgsObject extends BaseArgsObject {
  mouseSpeed: number
}

type ControllersMap = Record<string, CommandsTable>

type mode = keyof RenderByMode

type RenderByMode = Record<string, (arg: string) => string>
