import { IPatient } from "../../domain/IPatient";

export interface GetPatientByIdDto extends Pick<IPatient, 'id'> {} 