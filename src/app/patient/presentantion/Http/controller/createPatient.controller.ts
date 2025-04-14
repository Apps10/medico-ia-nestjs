import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreatePatientUseCase } from 'src/app/patient/application/useCases/createPatient.usecase';
import { CreatePatientHttpDto } from '../dtos/createPatient.http.dto';
import { CONSTANT_ROUTES } from 'src/common/contants/constants';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatientResponseDto } from 'src/app/patient/presentantion/Http/dtos/patientResponse.dto';
import { JwtAuthGuard } from 'src/app/auth/infraestructure/guards/jwt-auth.guard';
import { RolesGuard } from 'src/app/auth/infraestructure/guards/roles.guard';
import { RolesDecorator } from 'src/app/auth/infraestructure/decorators/roles.decorator';
import { patientPermissionsConstants } from 'src/app/patient/domain/constants/patient-permissions.constants';

@UseGuards(JwtAuthGuard, RolesGuard)
@RolesDecorator(patientPermissionsConstants.newPatient)

@ApiTags(CONSTANT_ROUTES.PATIENTS)
@Controller(CONSTANT_ROUTES.PATIENTS)
export class CreatePatientController {
  constructor(private readonly createPatientUseCase: CreatePatientUseCase) {}

  @Post('/')
  @ApiOperation({ summary: 'Crear un nuevo paciente' })
  @ApiResponse({
    status: 201,
    description: 'Paciente Creado Exitosamente!',
    type: PatientResponseDto,
  })
  @ApiBody({type: CreatePatientHttpDto})
  async run(@Body() createDto: CreatePatientHttpDto) {
    return this.createPatientUseCase.execute(createDto);
  }
}
