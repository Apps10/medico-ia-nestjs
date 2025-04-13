import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatientResponseDto } from 'src/app/patient/presentantion/Http/dtos/patientResponse.dto';
import { GetAllPatientUseCase } from 'src/app/patient/application/useCases/getAllPatient.usecase';
import { CONSTANT_ROUTES } from 'src/common/contants/constants';

@ApiTags(CONSTANT_ROUTES.PATIENTS)
@Controller(CONSTANT_ROUTES.PATIENTS)
export class GetAllPatientController {
  constructor(private readonly getAllPatientUseCase: GetAllPatientUseCase) {}

  @Get()
  @ApiOperation({ summary: 'consultar todos los pacientes' })
  @ApiResponse({
    status: 200,
    description: 'pacientes encontrados existosamente!',
    type: PatientResponseDto,
    isArray: true,
  })  
  async run() {
    return this.getAllPatientUseCase.execute();
  }
}
