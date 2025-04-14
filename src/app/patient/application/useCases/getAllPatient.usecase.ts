import { Injectable } from "@nestjs/common";
import { PatientRepository } from "../../domain/repositories/patient.repository";
import { PatientsNoRegisteredHttpException } from "../../domain/exceptions/patient.exception";

@Injectable()
export class GetAllPatientUseCase {
  constructor(private readonly patientRepository: PatientRepository){}

  async execute(){
    const patients = await this.patientRepository.getAll()
    
    if(patients.length == 0) throw new PatientsNoRegisteredHttpException()

    return this.patientRepository.getAll()
  }
}