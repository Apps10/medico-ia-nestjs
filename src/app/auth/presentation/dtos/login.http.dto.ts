import { IsString } from "class-validator"
import { ILoginUser } from "../../domain/IUser"
import { ApiProperty } from "@nestjs/swagger"

export class LoginHttpDto implements ILoginUser{ 
  @ApiProperty({example: "patient", description: "Usuario para loguearse al sistema"})
  @IsString({message: "El Usuario es requerido"})
  username: string

  @ApiProperty({example: "patient", description: "Contraseña para loguearse al sistema"})
  @IsString({message: "La Contraseña es requerida"})
  password: string
}