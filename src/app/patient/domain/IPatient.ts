export interface IMedicalHistoryPatient {
  id: number
  text: string
}

export interface IPatient {
  id: number,
  name: string,
  lastname: string,
  birthdate: string,
}

export interface IPatientWithMedicalHistory extends IPatient {
  medicalHistory: IMedicalHistoryPatient[]
}



export interface ICreatePatient extends Omit<IPatient, 'id' > {}
export interface IUpdatePatient extends Partial<ICreatePatient> {}