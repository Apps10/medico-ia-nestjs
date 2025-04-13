import { Body, Controller, Post } from '@nestjs/common';
import { CreatePatientUseCase } from 'src/app/patient/application/useCases/createPatient.usecase';
import { CreatePatientHttpDto } from '../dtos/createPatient.http.dto';
import { CONSTANT_ROUTES } from 'src/common/contants/constants';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatientResponseDto } from 'src/app/patient/presentantion/Http/dtos/patientResponse.dto';

@ApiTags(CONSTANT_ROUTES.PATIENTS)
@Controller(CONSTANT_ROUTES.PATIENTS)
export class CreatePatientController {
  constructor(private readonly createPatientUseCase: CreatePatientUseCase) {}

  @Post('/')
  @ApiOperation({ summary: 'Crear un nuevo paciente' })
  @ApiResponse({
    status: 201,
    description: 'patient created successfully',
    type: PatientResponseDto,
  })
  @ApiBody({type: CreatePatientHttpDto})
  async run(@Body() createDto: CreatePatientHttpDto) {
    return this.createPatientUseCase.execute(createDto);
  }
}
