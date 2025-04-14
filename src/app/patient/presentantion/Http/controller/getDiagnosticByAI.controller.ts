import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetDiagnosticIAByMedicalHistoryUseCase } from "src/app/doctorIA/application/usesCases/getDiagnosticIAByMedicalHistory.usecase";
import { CONSTANT_ROUTES } from "src/common/contants/constants";

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