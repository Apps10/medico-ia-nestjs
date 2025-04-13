import { Injectable } from "@nestjs/common";
import { PatientRepository } from "../../domain/repositories/patient.repository";
import { IPatient } from "../../domain/IPatient";
import { GetPatientByIdDto } from "../dtos/getPatientById.dto";
import { PatientNotFoundHttpException } from "../../domain/exceptions/patient.exception";

@Injectable()
export class GetPatientByIdUseCase {
  constructor(private readonly patientRepository: PatientRepository ){}


  async execute({ id }: GetPatientByIdDto): Promise<IPatient>{
    const patient = await this.patientRepository.getById(id)

    if(!patient) throw new PatientNotFoundHttpException()

    return patient
  }
}