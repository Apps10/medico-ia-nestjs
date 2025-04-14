import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { AILogRepository } from '../domain/repositories/aiLog.repository';
import { AILogPrismaRepository } from './repositories/aiLogPrisma.repository';
import { DoctorIAService } from '../domain/service/doctorIa.service';
import { OpenAIDoctorAdapter } from './adapters/openAIDoctor.adapter';
import { GeminiDoctorAdapter } from './adapters/geminiDoctor.adapter';
import { MockAIDoctorAdapter } from './adapters/mockAIDoctor.adapter';
import { FallbackAiAdapter } from './adapters/FallBackAi.adapter';
import { GetAllAiLogsController } from '../presentation/controllers/getIALogs.controller';
import { GetAllLogsUsecase } from '../application/usesCases/getAILogs.usecase';
import { AuthModule } from 'src/app/auth/infraestructure/auth.module';

@Module({
  controllers: [GetAllAiLogsController],
  providers: [
    PrismaService,
    GetAllLogsUsecase,
    AILogPrismaRepository,
    {
      provide: DoctorIAService,
      useFactory: (aiLogRepo: AILogRepository) => {
        const openIA = new OpenAIDoctorAdapter();
        const gemini = new GeminiDoctorAdapter();
        const mock = new MockAIDoctorAdapter();
        return new FallbackAiAdapter([openIA, gemini, mock], aiLogRepo);
      },
      inject: [AILogRepository],
    },
    {
      provide: AILogRepository,
      useClass: AILogPrismaRepository,
    },
  ],
  imports: [AuthModule],
  exports: [DoctorIAService],
})
export class DoctorIAModule {}
