import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatientResponseDto } from 'src/app/patient/presentantion/Http/dtos/patientResponse.dto';
import { GetAllPatientUseCase } from 'src/app/patient/application/useCases/getAllPatient.usecase';
import { CONSTANT_ROUTES } from 'src/common/contants/constants';
import { RolesDecorator } from 'src/app/auth/infraestructure/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/app/auth/infraestructure/guards/jwt-auth.guard';
import { RolesGuard } from 'src/app/auth/infraestructure/guards/roles.guard';
import { patientPermissionsConstants } from 'src/app/patient/domain/constants/patient-permissions.constants';

@UseGuards(JwtAuthGuard, RolesGuard)
@RolesDecorator(patientPermissionsConstants.getAllPatients)

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
