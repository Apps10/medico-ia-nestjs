import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IPatient } from '../../../domain/IPatient';

@ApiSchema({name: "Objecto Paciente" })
export class PatientResponseDto implements IPatient {
  @ApiProperty({
    example: 1,
    description: 'Identificador único del paciente',
    examples: [1, 2, 3, 4, 5],
  })
  id: number;

  @ApiProperty({
    example: 'Alfonso',
    description: 'Nombre del paciente',
  })
  name: string;

  @ApiProperty({
    example: 'Contreras',
    description: 'Apellido del paciente',
  })
  lastname: string;

  @ApiProperty({
    example: '1999-12-16',
    description: 'Fecha de nacimiento del paciente en formato YYYY-MM-DD',
    type: String,
  })
  birthdate: string;
}
