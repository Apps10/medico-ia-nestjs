import { Module } from "@nestjs/common";
import { CreatePatientController } from "./controller/createPatient.controller";
import { CreatePatientUseCase } from "../../application/useCases/createPatient.usecase";
import { GetPatientByIdUseCase } from "../../application/useCases/getPatientById.usecase";
import { PatientRepository } from "../../domain/repositories/patient.repository";
import { PatientPrismaRepository } from "../../infraestructure/repositories/patient.prisma.repository";
import { PrismaService } from "src/common/services/prisma.service";
import { GetPatientByIdController } from "./controller/getPatientById.controller";
import { GetAllPatientUseCase } from "../../application/useCases/getAllPatient.usecase";
import { GetAllPatientController } from "./controller/getAllPatient.controller";
import { GetDiagnosticByAIController } from "./controller/getDiagnosticByAI.controller";
import { GetDiagnosticIAByMedicalHistoryUseCase } from "src/app/doctorIA/application/usesCases/getDiagnosticIAByMedicalHistory.usecase";
import { DoctorIAService } from "src/app/doctorIA/domain/service/doctorIa.service";
import { OpenAIDoctorAdapter } from "src/app/doctorIA/infraestructure/adapters/openAIDoctor.adapter";
import { GeminiDoctorAdapter } from "src/app/doctorIA/infraestructure/adapters/geminiDoctor.adapter";
import { DeepSeekDoctorAdapter } from "src/app/doctorIA/infraestructure/adapters/deepSeekDoctor.adapter";
import { MockAIDoctorAdapter } from "src/app/doctorIA/infraestructure/adapters/mockAIDoctor.adapter";
import { FallbackAiAdapter } from "src/app/doctorIA/infraestructure/adapters/FallBackAi.adapter";

@Module({
  controllers: [
    CreatePatientController,
    GetPatientByIdController,
    GetAllPatientController,
    GetDiagnosticByAIController
  ],
  providers: [
    CreatePatientUseCase,
    GetPatientByIdUseCase,
    GetAllPatientUseCase,
    GetDiagnosticIAByMedicalHistoryUseCase,
    PrismaService,
    {
      provide: PatientRepository,
      useClass: PatientPrismaRepository
    },
    {
      provide: DoctorIAService,
      useFactory: () => {
        const openIA = new OpenAIDoctorAdapter();
        const gemini = new GeminiDoctorAdapter()
        const mock = new MockAIDoctorAdapter()
        return new FallbackAiAdapter([openIA, gemini, mock])
      } 
    },
  ]
 
})

export class PatientModule {}