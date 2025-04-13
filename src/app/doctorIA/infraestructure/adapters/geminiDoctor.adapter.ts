import env from "src/config/envs";
import { DoctorIAService } from "../../domain/service/doctorIa.service";
import fetch from 'node-fetch';
import { Logger } from "@nestjs/common";
import { DiagnosticException } from "../../domain/exceptions/doctorIa.exception";

export class GeminiDoctorAdapter implements DoctorIAService {
  private readonly logger = new Logger('GeminiDoctorService')
  private readonly provider = "gemini"

  async generateDiagnostic(medicalHistory: string[]): Promise< {diagnostic: string, provider: string}> {
    try{
      const model = "gemini-2.0-flash"
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${env.GEMINI_API_KEY}`;
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `Actúa como un doctor. A continuación, te paso una lista de síntomas: ${medicalHistory.join(", ")}. Dame un diagnóstico sugerido y posibles tratamientos de manera muy resumida. Solo puedes responder cosas relacionadas con la medicina y los sintomas de enfermedades`,
              },
            ],
          },
        ],
      };
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      console.log(data)
      const diagnostic = data.candidates[0].content.parts[0].text
      return { diagnostic, provider: this.provider}
    }catch(error){
      this.logger.error("Error al generar el diagnostico con IA:", error)
      throw new DiagnosticException() 
    }
  }
}