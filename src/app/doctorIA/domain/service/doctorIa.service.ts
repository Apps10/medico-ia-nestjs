export abstract class DoctorIAService {
  abstract generateDiagnostic(medicalHistory: string[]): Promise< {diagnostic: string, provider: string}>
}