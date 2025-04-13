import { Injectable } from "@nestjs/common";
import { DoctorIAService } from "../../domain/service/doctorIa.service";
import { IPatient } from "src/app/patient/domain/IPatient";
import { GetPatientByIdUseCase } from "src/app/patient/application/useCases/getPatientById.usecase";

@Injectable()
export class GetDiagnosticIAByMedicalHistoryUseCase  {
  constructor(
    private readonly getPatientByIdUseCase: GetPatientByIdUseCase,
    private readonly doctorIaService: DoctorIAService
  ){}
  
  async execute(id: number): Promise<{ diagnostic: string }>{
    const patient = await this.getPatientByIdUseCase.execute({ id })
    const { diagnostic, provider } = await this.doctorIaService.generateDiagnostic(patient.medicalHistory)
    console.log(provider)
    //registrar en db consulta a provider IA

    return { diagnostic }
  }
}