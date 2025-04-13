import { Injectable } from "@nestjs/common";
import { PatientRepository } from "../../domain/repositories/patient.repository";

@Injectable()
export class GetAllPatientUseCase {
  constructor(private readonly patientRepository: PatientRepository){}

  async execute(){
    return this.patientRepository.getAll()
  }
}