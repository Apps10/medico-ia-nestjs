import { Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { CreatePatientDto } from "src/app/patient/application/dtos/createPatient.dto";

export class CreatePatientHttpDto implements CreatePatientDto {
  @IsNotEmpty({message: "The name is required"})
  @IsString({message: "The name should be a string"})
  name: string;

  @IsNotEmpty({message: "The lastname is required"})
  @IsString({message: "The lastname should be a string"})
  lastname: string;

  @IsDateString({},{message: "The birthdate should be of the type YYYY-MM-DD"})
  birthdate: string;
}