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
@Module({
  controllers: [
    CreatePatientController,
    GetPatientByIdController,
    GetAllPatientController
  ],
  providers: [
    CreatePatientUseCase,
    GetPatientByIdUseCase,
    GetAllPatientUseCase,
    PrismaService,
    {
      provide: PatientRepository,
      useClass: PatientPrismaRepository
    },
  ]
 
})

export class PatientModule {}