import { IsString } from "class-validator";
import { GetPatientByIdDto } from "../../../application/dtos/getPatientById.dto"
import { Transform } from "class-transformer";
export class GetPatientByIdHttpDto implements GetPatientByIdDto {
  
  @IsString()
  @Transform(({ value }) => Number(value))
  id: number;
}