import { GetAllPatientUseCase } from "./getAllPatient.usecase"
import { PatientRepository } from "../../domain/repositories/patient.repository"
import { PatientsNoRegisteredHttpException } from "../../domain/exceptions/patient.exception"
import { IPatient } from "../../domain/IPatient"

describe("GetAllPatientUseCase", () => {
  let useCase: GetAllPatientUseCase
  let patientRepoMock: jest.Mocked<PatientRepository>

  beforeEach(() => {
    patientRepoMock = {
      getAll: jest.fn()
    } as any

    useCase = new GetAllPatientUseCase(patientRepoMock)
  })

  it("should throw PatientsNoRegisteredHttpException if no patients are found", async () => {
    patientRepoMock.getAll.mockResolvedValue([])

    await expect(useCase.execute()).rejects.toThrow(PatientsNoRegisteredHttpException)
  })

  it("should return all patients", async () => {
    const patients: IPatient[] = [
      { id: 1, name: "pepito", lastname: "perez", birthdate: "2001-01-01", medicalHistory: ["asma"] },
      { id: 2, name: "Anita",  lastname: "la bonita", birthdate: "2008-06-15", medicalHistory: ["dolor de espalda"] }
    ]

    patientRepoMock.getAll.mockResolvedValue(patients)

    const result = await useCase.execute()

    expect(result).toEqual(patients)
  })
})
