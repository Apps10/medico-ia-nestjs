import { DoctorIAService } from "../../domain/service/doctorIa.service";

export class FallbackAiAdapter implements DoctorIAService {
  constructor(private readonly AIs: DoctorIAService[]) {}

  async generateDiagnostic(medicalHistory: string[]): Promise< {diagnostic: string, provider: string}>{
    for (const Ai of this.AIs) {
      try {
        return await Ai.generateDiagnostic(medicalHistory);
      } catch (err) {
        continue;
      }
    }
    throw new Error("All AI providers failed");
  }
  
}