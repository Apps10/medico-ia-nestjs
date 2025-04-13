import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { CreatePatientDto } from "src/app/patient/application/dtos/createPatient.dto";

@ApiSchema({name: "Crear paciente", description: "Parametros Para Crear Un Paciente" })
export class CreatePatientHttpDto implements CreatePatientDto {
  @ApiProperty({example: "alfonso", description: "Nombre del Paciente"})
  @IsNotEmpty({message: "The name is required"})
  @IsString({message: "The name should be a string"})
  name: string;
  
  
  @ApiProperty({example: "contreras", description: "Apellido del Paciente"})
  @IsNotEmpty({message: "The lastname is required"})
  @IsString({message: "The lastname should be a string"})
  lastname: string;
  
  @ApiProperty({example: "1999-12-16", description: "Fecha de nacimiento del Paciente"})
  @IsDateString({},{message: "The birthdate should be of the type YYYY-MM-DD"})
  birthdate: string;
}