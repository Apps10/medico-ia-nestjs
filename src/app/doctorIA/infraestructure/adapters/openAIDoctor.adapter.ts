import env from "src/config/envs";
import { DoctorIAService } from "../../domain/service/doctorIa.service";
import { OpenAI } from "openai";
import { Logger } from "@nestjs/common";
import { DiagnosticException } from "../../domain/exceptions/doctorIa.exception";

export class OpenAIDoctorAdapter implements DoctorIAService {
  private readonly clientOpenAI = new OpenAI({ apiKey: env.OPENAI_API_KEY })
  private readonly logger = new Logger('OpenAIDoctorService')
  private readonly provider = "openAI"


  async generateDiagnostic(medicalHistory: string[]):Promise< {diagnostic: string, provider: string}> {
    try{
      const response = await this.clientOpenAI.chat.completions.create({
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
        model: "gpt-4o"
      })
      const diagnostic = response.choices[0].message.content.trim()
      return { diagnostic, provider: this.provider }
    }catch(error){
      this.logger.error("Error al generar el diagnostico con IA:", error.error)
      throw new DiagnosticException() 
    }
  }
}