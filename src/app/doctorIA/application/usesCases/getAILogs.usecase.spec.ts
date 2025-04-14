import { LogsNoRegisteredHttpException } from "../../domain/exceptions/doctorIa.exception"
import { IIaLog } from "../../domain/IIalog"
import { AILogRepository } from "../../domain/repositories/aiLog.repository"
import { GetAllLogsUsecase } from "./getAILogs.usecase"

describe("GetAILogsUseCase", ()=> {
  let aiLogRepository: jest.Mocked<AILogRepository>
  let getAiLogsUseCase: GetAllLogsUsecase

  beforeEach(()=>{
    aiLogRepository = {
      getLogs: jest.fn()
    } as any

    getAiLogsUseCase = new GetAllLogsUsecase(aiLogRepository)
  })

  it('should throw LogsNoRegisteredHttpException if not exist any log', async() => {
    aiLogRepository.getLogs.mockResolvedValue([])

    await expect(getAiLogsUseCase.execute()).rejects.toThrow(LogsNoRegisteredHttpException)
  })


  it('should return logs array', async() => {
    const mockLogs: IIaLog[] = [
      {
        id: 1,
        provider: "deepseek",
        input: "dolor de cabeza,cansancio",
        output: null,
        status: "error",
        errorMessage: "error al generar el diagnostico",
        createdAt: new Date()
      },
      {
        id: 2,
        provider: "deepseek",
        input: "dolor de cabeza,cansancio",
        output: null,
        status: "error",
        errorMessage: "error al generar el diagnostico",
        createdAt: new Date()
      },
    ]
    aiLogRepository.getLogs.mockResolvedValue(mockLogs)
    const result = await getAiLogsUseCase.execute()

    expect(result).toEqual(mockLogs)
  })
})