import { ICreatePatient, IPatient } from "../IPatient";

export abstract class PatientRepository {
  abstract getAll(): Promise<IPatient[] | []>
  abstract getById(id: IPatient['id']): Promise<IPatient | null>
  abstract create(patient: ICreatePatient): Promise<IPatient>
  abstract getPatientWithMedicalHistory(id: IPatient['id']): Promise<IPatient>
}