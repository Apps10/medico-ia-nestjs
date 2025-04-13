import { Injectable } from "@nestjs/common";
import { PatientRepository } from "../../domain/repositories/patient.repository";
import { IPatient } from "../../domain/IPatient";
import { CreatePatientDto } from "../dtos/createPatient.dto";

@Injectable()
export class CreatePatientUseCase {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(task: CreatePatientDto): Promise<IPatient> {
    return this.patientRepository.create(task)
  }
}