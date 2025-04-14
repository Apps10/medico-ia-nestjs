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
import { DoctorIAModule } from "src/app/doctorIA/presentation/doctorIa.module";

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
  ],
  imports: [
    DoctorIAModule
  ]
 
})

export class PatientModule {}