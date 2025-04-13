import { Controller, Get, Param } from '@nestjs/common';
import { GetPatientByIdUseCase } from 'src/app/patient/application/useCases/getPatientById.usecase';
import { CONSTANT_ROUTES } from 'src/common/contants/constants';
import { GetPatientByIdHttpDto } from '../dtos/getPatientById.http.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatientResponseDto } from 'src/app/patient/presentantion/Http/dtos/patientResponse.dto';

@ApiTags(CONSTANT_ROUTES.PATIENTS)
@Controller(CONSTANT_ROUTES.PATIENTS)
export class GetPatientByIdController {
  constructor(private readonly getPatientByIdUseCase: GetPatientByIdUseCase) {}

  @Get('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del paciente',
    example: 1,
    allowReserved: true,
  })
  
  @ApiOperation({ summary: 'Consultar Paciente por Id' })
  @ApiResponse({
    description: 'patient found successfully',
    type: PatientResponseDto,
  })
  async run(@Param() dto: GetPatientByIdHttpDto) {
    return this.getPatientByIdUseCase.execute(dto);
  }
}
