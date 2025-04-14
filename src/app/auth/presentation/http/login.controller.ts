import { Body, Controller, Post } from "@nestjs/common";
import { LoginUseCase } from "../../application/login.usecase";
import { CONSTANT_ROUTES } from "src/common/contants/constants";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginHttpDto } from "../dtos/login.http.dto";

@Controller(CONSTANT_ROUTES.AUTH)
@ApiTags(CONSTANT_ROUTES.AUTH)
export class LoginController {
  constructor(private readonly loginUseCase: LoginUseCase){}

  @Post("/login")
  @ApiOperation({ summary: 'Login' })
  @ApiBody({type: LoginHttpDto})
  async run(@Body() loginDto: LoginHttpDto): Promise<{ token: string }> {
    return this.loginUseCase.execute(loginDto)
  }
}