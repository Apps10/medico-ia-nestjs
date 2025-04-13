import { Type } from "class-transformer";
import { IsDateString, IsString } from "class-validator";
import { CreatePatientDto } from "src/app/patient/application/dtos/createPatient.dto";

export class CreatePatientHttpDto implements CreatePatientDto {
  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsDateString()
  birthdate: string;
}