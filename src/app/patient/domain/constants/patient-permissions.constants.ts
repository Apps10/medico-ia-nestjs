import { roleUser } from "src/app/auth/domain/IUser";

type Action = 'newPatient' | "getAllPatients" | "getPatientByid" | "diagnosticIa"
export const patientPermissionsConstants: Record< Action ,roleUser[]> = {
   diagnosticIa: ["doctor"],
   getAllPatients: ["doctor", "patient"],
   getPatientByid: ["doctor", "patient"],
   newPatient: ["doctor"]
}