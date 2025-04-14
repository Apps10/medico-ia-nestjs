import { GetDiagnosticIAByMedicalHistoryUseCase } from "./getDiagnosticIAByMedicalHistory.usecase"
import { GetPatientByIdUseCase } from "src/app/patient/application/useCases/getPatientById.usecase"
import { DoctorIAService } from "../../domain/service/doctorIa.service"
import { IPatient } from "src/app/patient/domain/IPatient"

describe("GetDiagnosticIAByMedicalHistoryUseCase", () => {
  let useCase: GetDiagnosticIAByMedicalHistoryUseCase
  let getPatientByIdUseCaseMock: jest.Mocked<GetPatientByIdUseCase>
  let doctorIaServiceMock: jest.Mocked<DoctorIAService>

  beforeEach(() => {
    getPatientByIdUseCaseMock = {
      execute: jest.fn()
    } as any

    doctorIaServiceMock = {
      generateDiagnostic: jest.fn()
    } as any

    useCase = new GetDiagnosticIAByMedicalHistoryUseCase(
      getPatientByIdUseCaseMock,
      doctorIaServiceMock
    )
  })

  it("should return diagnostic from DoctorIAService based on patient's medical history", async () => {
    const mockPatient: IPatient = {
      id: 1,
      name: "juan",
      lastname: "perez",
      birthdate: "2000-01-01",
      medicalHistory: ["Fiebre, tos, dolor de cabeza"]
    }

    const mockDiagnostic = {
      diagnostic: "Posible gripe, tomar acetaminofen cada 8 horas por 5 dias",
      provider: "mock"
    }

    getPatientByIdUseCaseMock.execute.mockResolvedValue(mockPatient)
    doctorIaServiceMock.generateDiagnostic.mockResolvedValue(mockDiagnostic)

    const result = await useCase.execute(1)

    expect(getPatientByIdUseCaseMock.execute).toHaveBeenCalledWith({ id: 1 })
    expect(doctorIaServiceMock.generateDiagnostic).toHaveBeenCalledWith(["Fiebre, tos, dolor de cabeza"])
    expect(result).toEqual({ diagnostic: "Posible gripe, tomar acetaminofen cada 8 horas por 5 dias" })
  })
})
