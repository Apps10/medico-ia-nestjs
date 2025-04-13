import { Body, Controller, Post } from "@nestjs/common";
import { CreatePatientUseCase } from "src/app/patient/application/useCases/createPatient.usecase";
import { CreatePatientHttpDto } from "../dtos/createPatient.http.dto";
import { CONSTANT_ROUTES } from "src/common/contants/constants";

@Controller(CONSTANT_ROUTES.PATIENTS)
export class CreatePatientController {
  constructor(private readonly createPatientUseCase: CreatePatientUseCase){}
  
  @Post('/')
  async run(@Body() createDto: CreatePatientHttpDto){
    this.createPatientUseCase.execute(createDto)
  }
}