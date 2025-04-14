import { Controller, Get, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RolesDecorator } from "src/app/auth/infraestructure/decorators/roles.decorator";
import { JwtAuthGuard } from "src/app/auth/infraestructure/guards/jwt-auth.guard";
import { RolesGuard } from "src/app/auth/infraestructure/guards/roles.guard";
import { GetDiagnosticIAByMedicalHistoryUseCase } from "src/app/doctorIA/application/usesCases/getDiagnosticIAByMedicalHistory.usecase";
import { patientPermissionsConstants } from "src/app/patient/domain/constants/patient-permissions.constants";
import { CONSTANT_ROUTES } from "src/common/contants/constants";


@UseGuards(JwtAuthGuard, RolesGuard)
@RolesDecorator(patientPermissionsConstants.diagnosticIa)

@ApiTags(CONSTANT_ROUTES.PATIENTS)
@Controller(CONSTANT_ROUTES.PATIENTS)
export class GetDiagnosticByAIController {
  constructor(
    private readonly doctorUseCase: GetDiagnosticIAByMedicalHistoryUseCase,
  ){}

  @Get('/:id/diagnostic-ai')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del paciente',
    example: 1,
    allowReserved: true,
  })
  @ApiOperation({ summary: "Obtener diagnóstico sugerido con IA" })
  @ApiResponse({ status: 200, description: "Diagnóstico generado" })
  @ApiOkResponse({
    example: "Posible infección por síntomas de dolor..."
  })
  async run(@Param('id', ParseIntPipe) id: number){
    return this.doctorUseCase.execute(id)
  }
  
}