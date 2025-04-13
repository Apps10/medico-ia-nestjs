import { Controller, Get } from "@nestjs/common";
import { GetAllPatientUseCase } from "src/app/patient/application/useCases/getAllPatient.usecase";
import { CONSTANT_ROUTES } from "src/common/contants/constants";

@Controller(CONSTANT_ROUTES.PATIENTS)
export class GetAllPatientController {
  constructor(private readonly getAllPatientUseCase: GetAllPatientUseCase){}

  @Get()
  async run(){
    return this.getAllPatientUseCase.execute()
  }
}