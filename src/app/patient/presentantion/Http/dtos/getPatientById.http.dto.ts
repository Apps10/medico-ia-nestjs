import { IsInt, IsPositive, IsString } from "class-validator";
import { GetPatientByIdDto } from "../../../application/dtos/getPatientById.dto"
import { Transform } from "class-transformer";
export class GetPatientByIdHttpDto implements GetPatientByIdDto {
  
  @Transform(({ value }) => Number(value))
  @IsPositive()
  @IsInt()
  id: number;
}