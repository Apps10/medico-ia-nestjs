import { Controller, Get, UseGuards } from "@nestjs/common";
import { CONSTANT_ROUTES } from "src/common/contants/constants";
import { GetAllLogsUsecase } from "../../application/usesCases/getAILogs.usecase";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/app/auth/infraestructure/guards/jwt-auth.guard";
import { RolesGuard } from "src/app/auth/infraestructure/guards/roles.guard";
import { doctorIaPermissionsConstants } from "../../domain/constants/doctorIa.permissions.constants";
import { RolesDecorator } from "src/app/auth/infraestructure/decorators/roles.decorator";


@Controller(CONSTANT_ROUTES.LOGS)
@ApiTags(CONSTANT_ROUTES.LOGS)

@UseGuards(JwtAuthGuard, RolesGuard)
@RolesDecorator(doctorIaPermissionsConstants.getLogs)
export class GetAllAiLogsController {
  constructor(private readonly getAllLogsUseCase: GetAllLogsUsecase) {}

  @Get()
  @ApiOperation({ summary: 'consultar todos los logs de las consultas IA' })
  @ApiResponse({
    status: 200,
    description: 'logs encontrados existosamente!',
    isArray: true,
  })  
  async run(){
    return this.getAllLogsUseCase.execute()
  }
}