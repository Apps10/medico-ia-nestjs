import { GetPatientByIdUseCase } from "./getPatientById.usecase"
import { PatientRepository } from "../../domain/repositories/patient.repository"
import { PatientNotFoundHttpException } from "../../domain/exceptions/patient.exception"
import { IPatient } from "../../domain/IPatient"
import { GetPatientByIdDto } from "../dtos/getPatientById.dto"

describe("GetPatientByIdUseCase", () => {
  let useCase: GetPatientByIdUseCase
  let patientRepoMock: jest.Mocked<PatientRepository>

  beforeEach(() => {
    patientRepoMock = {
      getById: jest.fn()
    } as any

    useCase = new GetPatientByIdUseCase(patientRepoMock)
  })

  it("should throw PatientNotFoundHttpException if patient is not found", async () => {
    const dto: GetPatientByIdDto = { id: 1 }

    patientRepoMock.getById.mockResolvedValue(null)

    await expect(useCase.execute(dto)).rejects.toThrow(PatientNotFoundHttpException)
  })

  it("should return the patient if found", async () => {
    const patient: IPatient = { id: 1, name: "pepito", lastname: "perez", birthdate: "1990-01-01", medicalHistory: ["asma"] }
    const dto: GetPatientByIdDto = { id: 1 }

    patientRepoMock.getById.mockResolvedValue(patient)

    const result = await useCase.execute(dto)

    expect(result).toEqual(patient)
  })
})
