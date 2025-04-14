import { Inject, Injectable } from "@nestjs/common";
import { AILogRepository } from "../../domain/repositories/aiLog.repository";
import { IIaLog } from "../../domain/IIalog";
import { LogsNoRegisteredHttpException } from "../../domain/exceptions/doctorIa.exception";

@Injectable()
export class GetAllLogsUsecase {
  constructor(private readonly aiLogRepository: AILogRepository){}
  
  async execute(): Promise<IIaLog[]>{
    const logs = await this.aiLogRepository.getLogs() 
    if(logs.length == 0 ) throw new LogsNoRegisteredHttpException()

    return logs
  }
}