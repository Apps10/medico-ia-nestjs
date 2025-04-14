import { Module } from "@nestjs/common";
import { PrismaService } from "src/common/services/prisma.service";
import { AILogRepository } from "../domain/repositories/aiLog.repository";
import { AILogPrismaRepository } from "../infraestructure/repositories/aiLogPrisma.repository";
import { DoctorIAService } from "../domain/service/doctorIa.service";
import { OpenAIDoctorAdapter } from "../infraestructure/adapters/openAIDoctor.adapter";
import { GeminiDoctorAdapter } from "../infraestructure/adapters/geminiDoctor.adapter";
import { MockAIDoctorAdapter } from "../infraestructure/adapters/mockAIDoctor.adapter";
import { FallbackAiAdapter } from "../infraestructure/adapters/FallBackAi.adapter";
import { GetAllAiLogsController } from "./controllers/getIALogs.controller";
import { GetAllLogsUsecase } from "../application/usesCases/getAILogs.usecase";

@Module({
  controllers: [
    GetAllAiLogsController
  ],
  providers: [
    PrismaService,
    GetAllLogsUsecase,
    AILogPrismaRepository,
    {
      provide: DoctorIAService,
      useFactory: (aiLogRepo: AILogRepository) => {
        const openIA = new OpenAIDoctorAdapter();
        const gemini = new GeminiDoctorAdapter()
        const mock = new MockAIDoctorAdapter()
        return new FallbackAiAdapter([openIA, gemini, mock], aiLogRepo)
      },
      inject: [AILogRepository]
    },    
    {
      provide: AILogRepository,
      useClass: AILogPrismaRepository
    },
   
  ],
  exports: [
    DoctorIAService,
  ]
})

export class DoctorIAModule {}