import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsDateString, IsNotEmpty, IsString } from "class-validator";
import { CreatePatientDto } from "src/app/patient/application/dtos/createPatient.dto";

@ApiSchema({name: "Crear paciente", description: "Parametros Para Crear Un Paciente" })
export class CreatePatientHttpDto implements CreatePatientDto {
  @ApiProperty({example: "alfonso", description: "Nombre del Paciente"})
  @IsNotEmpty({message: "el parametro name es obligatorio"})
  @IsString({message: "El parametro name debe ser un string"})
  name: string;
  
  
  @ApiProperty({example: "contreras", description: "Apellido del Paciente"})
  @IsNotEmpty({message: "The parametro lastname es obligatorio"})
  @IsString({message: "El lastname debe ser un string"})
  lastname: string;
  
  @ApiProperty({example: "1999-12-16", description: "Fecha de nacimiento del Paciente"})
  @IsDateString({},{message: "El birthdate debe ser del tipo YYYY-MM-DD"})
  birthdate: string;

  @ApiProperty({example: "['mareo', 'dolor de espalda']", description: "Sintomas del paciente"})
  @IsArray({ message: 'El parametro medicalHistory es obligatorio y debe ser un array' })
  @ArrayMinSize(1, { message: "'medicalHistory' debe tener almenos un elemento"})
  @IsString({each: true, message: "cada valor en 'medicalHistory' debe ser una cadena de texto" })
  medicalHistory: string[];
}