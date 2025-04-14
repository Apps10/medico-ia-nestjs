import { Module } from "@nestjs/common";
import { LoginUseCase } from "../application/login.usecase";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { LoginController } from "../presentation/http/login.controller";
import { AuthRepository } from "../domain/repositories/Auth.repository";
import { MockAuthRepository } from "./repositories/mockAuth.repository";
import env from "src/config/envs";

@Module({
  imports: [
    JwtModule.register({ 
      secret: env.JWT_SECRET, 
      signOptions: { expiresIn: '1h' }
    })
  ],
  controllers: [
    LoginController
  ],
  providers: [
    LoginUseCase,
    {
      provide: AuthRepository,
      useClass: MockAuthRepository
    },
  ],
  exports: [
    AuthRepository,
    JwtModule
  ]
})
export class AuthModule {}