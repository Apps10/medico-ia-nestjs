import { PrismaService } from "src/common/services/prisma.service";
import { ICreateIaLog, IIaLog } from "../../domain/IIalog";
import { AILogRepository } from "../../domain/repositories/aiLog.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AILogPrismaRepository implements AILogRepository {
  constructor(private readonly prismaService: PrismaService){}

  async saveLog(log: ICreateIaLog): Promise<void> {
    await this.prismaService.iaLog.create({
      data: log
    })
  }

  async getLogs(): Promise<IIaLog[] | []> {
    const logs = await this.prismaService.iaLog.findMany()
    return logs
  }
}