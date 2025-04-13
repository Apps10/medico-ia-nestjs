import env from "src/config/envs";
import { DoctorIAService } from "../../domain/service/doctorIa.service";
import fetch from 'node-fetch';
import { Logger } from "@nestjs/common";
import { DiagnosticException } from "../../domain/exceptions/doctorIa.exception";

export class DeepSeekDoctorAdapter implements DoctorIAService {
  private readonly logger = new Logger('DeepSeekDoctorService')
  private readonly provider = "deepseek"
  
  async generateDiagnostic(medicalHistory: string[]): Promise<{ diagnostic: string, provider: string}> {
    try{
      const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { 
              role: "system", 
              content: "Eres un médico profesional. Analiza los síntomas y sugiere un diagnóstico y tratamiento de manera muy resumida. Solo puedes responder cosas relacionadas con la medicina y los sintomas de enfermedades" 
            },
            { 
              role: "user",
              content: `sintomas del paciente: ${medicalHistory.join(",")}`
            }
          ],
        }),
      });
      const data = await response.json();
      const diagnostic = data.choices[0].message?.content.trim() ?? "No se encontró un diagnóstico para este paciente.";

      return { provider: this.provider, diagnostic }
    }catch(error){
      this.logger.error("Error al generar el diagnostico con IA:", error)
      throw new DiagnosticException() 
    }
  }
}