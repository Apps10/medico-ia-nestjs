import { Controller, Get, Param } from "@nestjs/common";
import { GetPatientByIdUseCase } from "src/app/patient/application/useCases/getPatientById.usecase";
import { CONSTANT_ROUTES } from "src/common/contants/constants";
import { GetPatientByIdHttpDto } from "../dtos/getPatientById.http.dto";

@Controller(CONSTANT_ROUTES.PATIENTS)
export class GetPatientByIdController {
  constructor(private readonly getPatientByIdUseCase: GetPatientByIdUseCase) {}

  @Get("/:id")
  async run(@Param() dto: GetPatientByIdHttpDto){
    this.getPatientByIdUseCase.execute(dto)
  }
}