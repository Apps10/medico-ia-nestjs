import { IsString } from "class-validator";
import { GetPatientByIdDto } from "../../../application/dtos/getPatientById.dto"
import { Type } from "class-transformer";
export class GetPatientByIdHttpDto implements GetPatientByIdDto {
  
  @IsString()
  @Type(()=>Number)
  id: number;
}