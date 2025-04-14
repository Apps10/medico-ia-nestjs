import { JwtService } from "@nestjs/jwt";
import { AuthUnauthorizedHttpException } from "../domain/exceptions/auth.exception";
import { ILoginUser } from "../domain/IUser";
import { AuthRepository } from "../domain/repositories/Auth.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly jwtService: JwtService
  ){}


  async execute(loginDto: ILoginUser): Promise<{token: string}> {
    const user = await this.authRepo.ValidateUser(loginDto)
    if(!user) throw new AuthUnauthorizedHttpException()
      
    const payload = { sub: user.id, username: user.username, role: user.role } 
    const token = await this.jwtService.signAsync(payload)
    return { token }
  }
}