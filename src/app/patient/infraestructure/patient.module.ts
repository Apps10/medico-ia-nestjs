import { Module } from "@nestjs/common";
import { CreatePatientController } from "../presentantion/Http/controller/createPatient.controller";
import { DoctorIAModule } from "src/app/doctorIA/infraestructure/doctorIA.module";
import { GetPatientByIdController } from "../presentantion/Http/controller/getPatientById.controller";
import { GetAllPatientController } from "../presentantion/Http/controller/getAllPatient.controller";
import { GetDiagnosticByAIController } from "../presentantion/Http/controller/getDiagnosticByAI.controller";
import { CreatePatientUseCase } from "../application/useCases/createPatient.usecase";
import { GetPatientByIdUseCase } from "../application/useCases/getPatientById.usecase";
import { GetAllPatientUseCase } from "../application/useCases/getAllPatient.usecase";
import { GetDiagnosticIAByMedicalHistoryUseCase } from "src/app/doctorIA/application/usesCases/getDiagnosticIAByMedicalHistory.usecase";
import { PrismaService } from "src/common/services/prisma.service";
import { PatientRepository } from "../domain/repositories/patient.repository";
import { PatientPrismaRepository } from "./repositories/patient.prisma.repository";
import { AuthModule } from "src/app/auth/infraestructure/auth.module";

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
    DoctorIAModule,
    AuthModule
  ]
 
})

export class PatientModule {}