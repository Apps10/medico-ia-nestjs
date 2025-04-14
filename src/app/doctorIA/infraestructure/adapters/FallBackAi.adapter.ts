import { Logger } from "@nestjs/common";
import { DiagnosticException } from "../../domain/exceptions/doctorIa.exception";
import { IProviderIaLog } from "../../domain/IIalog";
import { AILogRepository } from "../../domain/repositories/aiLog.repository";
import { DoctorIAService } from "../../domain/service/doctorIa.service";

export class FallbackAiAdapter implements DoctorIAService {
  private readonly logger = new Logger('FallbackAiAdapter')
  
  constructor(
    private readonly adapters: DoctorIAService[], // si los quieres así, si no puedes usar solo uno
    private readonly aiLogRepository: AILogRepository,
  ) {}
  
  async generateDiagnostic(medicalHistory: string[]): Promise< {diagnostic: string, provider: string}>{
    for (const adapter of this.adapters) {
      try {

        const { diagnostic, provider } = await adapter.generateDiagnostic(medicalHistory);
        await this.aiLogRepository.saveLog({
          provider: provider as unknown as IProviderIaLog,
          input: medicalHistory.join(","),
          status: "success",
          output: diagnostic
        })
        return { diagnostic, provider }

      } catch (err) {

        if (!(err instanceof DiagnosticException)){
          this.logger.error("Error No Soportado", err)
          continue;
        }
        
        const { provider, error } = err['sharedData']
        await this.aiLogRepository.saveLog({
          provider: provider as unknown as IProviderIaLog,
          input: medicalHistory.join(","),
          status: "error",
          errorMessage: error
        })
        continue;
      }
    }
    throw new Error("All AI providers failed");
  }
  
}