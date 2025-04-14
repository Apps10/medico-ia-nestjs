import { Controller, Get } from "@nestjs/common";
import { CONSTANT_ROUTES } from "src/common/contants/constants";
import { GetAllLogsUsecase } from "../../application/usesCases/getAILogs.usecase";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";


@Controller(CONSTANT_ROUTES.LOGS)
@ApiTags(CONSTANT_ROUTES.LOGS)
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