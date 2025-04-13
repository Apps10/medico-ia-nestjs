import { DoctorIAService } from "../../domain/service/doctorIa.service";

export class MockAIDoctorAdapter implements DoctorIAService {
  private readonly provider = "mock"

  async generateDiagnostic(medicalHistory: string[]): Promise< {diagnostic: string, provider: string}> {
    let diagnostic = ""
    if (medicalHistory.includes("dolor")) diagnostic += "Posible diagnóstico: infección, tomar antibioticos cada 8 horas por 5 dias";
    if (medicalHistory.includes("fiebre")) diagnostic += "Posible diagnóstico: virus, tomar acetaminofen cada 8 horas por 5 dias";
    if(!diagnostic) diagnostic = "debes tomar acetaminofen cada 8 horas por 5 dias"
    
    return { diagnostic, provider: this.provider }
  }
}