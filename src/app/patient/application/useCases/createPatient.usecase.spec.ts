import { CreatePatientUseCase } from "./createPatient.usecase"
import { PatientRepository } from "../../domain/repositories/patient.repository"
import { CreatePatientDto } from "../dtos/createPatient.dto"
import { IPatient } from "../../domain/IPatient"

describe("CreatePatientUseCase", () => {
  let useCase: CreatePatientUseCase
  let patientRepoMock: jest.Mocked<PatientRepository>

  beforeEach(() => {
    patientRepoMock = {
      create: jest.fn()
    } as any

    useCase = new CreatePatientUseCase(patientRepoMock)
  })

  it("should call patientRepository.create and return the created patient", async () => {
    const input: CreatePatientDto = {
      name: "pepito",
      lastname: "perez",
      birthdate: "1990-01-01",
      medicalHistory: ['tos']
    }

    const createdPatient: IPatient = {
      id: 1,
      ...input
    }

    patientRepoMock.create.mockResolvedValue(createdPatient)

    const result = await useCase.execute(input)

    expect(result).toEqual(createdPatient)
  })
})
