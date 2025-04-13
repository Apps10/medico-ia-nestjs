import { Injectable } from "@nestjs/common";
import { PatientRepository } from "../../domain/repositories/patient.repository";
import { PrismaService } from "src/common/services/prisma.service";
import { ICreatePatient, IPatient, IPatientWithMedicalHistory } from "../../domain/IPatient";
import { PatientNotFoundHttpException } from "../../domain/exceptions/patient.exception";

@Injectable()
export class PatientPrismaRepository implements PatientRepository {
  constructor(private readonly prismaService: PrismaService){}

  async create(patient: ICreatePatient): Promise<IPatient> {
    const newPatient = await this.prismaService.patient.create({
      data: patient,
    })
    
    return {
      ...newPatient,
    }
  }

  async getAll(): Promise<IPatient[] | []> {
    const getPatients = await this.prismaService.patient.findMany()
    return {
      ...getPatients,
    }
  }

  async getById(id: IPatient["id"]): Promise<IPatient | null> {
    const patient = await this.prismaService.patient.findUnique({
      where: { id }
    })
    return patient
  }


  async getPatientHistory(id: IPatient["id"]): Promise<IPatient | null> {
    const patient = await this.prismaService.patient.findUnique({
      where: { id }
    })
    return patient
  }

  async getPatientMedicalHistory(id: IPatient["id"]): Promise<IPatientWithMedicalHistory> {
    const patientWithMedicalHistory = await this.prismaService.patient.findFirst({
      where: { id },
      include: {
        medicalHistory: true
      }
    })

    if(!patientWithMedicalHistory) throw new PatientNotFoundHttpException()
  
    return patientWithMedicalHistory
  }
}