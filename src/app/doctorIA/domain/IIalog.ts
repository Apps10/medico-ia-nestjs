export type IProviderIaLog = 'openAI' | 'deepseek' | 'gemini' |  'mock'
export type IStatusIaLog = 'success' | 'error'

export interface IIaLog {
  id: number
  provider: IProviderIaLog
  input: string
  output?: string | null
  status: IStatusIaLog
  errorMessage?: string | null
  createdAt: Date
}


export interface ICreateIaLog extends Omit<IIaLog, 'id'| 'createdAt'> {}

