import { ICreatePatient } from "../../domain/IPatient";

export class CreatePatientDto implements ICreatePatient {
  birthdate: string;
  lastname: string;
  name: string;
  medicalHistory: string[];
} 