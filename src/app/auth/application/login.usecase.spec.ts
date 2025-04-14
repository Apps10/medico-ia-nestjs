import { JwtService } from "@nestjs/jwt"
import { ILoginUser, IUser } from "../domain/IUser"
import { AuthRepository } from "../domain/repositories/Auth.repository"
import { LoginUseCase } from "./login.usecase"
import { AuthUnauthorizedHttpException } from "../domain/exceptions/auth.exception"

describe("loginUseCase", ()=>{
  let loginUseCase: LoginUseCase
  let authRepoMock: jest.Mocked<AuthRepository>
  let jwtServiceMock: jest.Mocked<JwtService>

  beforeEach(()=>{
    authRepoMock = {
      ValidateUser: jest.fn()
    } as any

    jwtServiceMock = {
      signAsync: jest.fn()
    } as any

    loginUseCase = new LoginUseCase(authRepoMock, jwtServiceMock)
  })

  it("should throw AuthUnauthorizedHttpException if user not exist", async() => {
    const loginUser:ILoginUser = { username:"not-exist-user", password: "not-exist-user" }
    
    authRepoMock.ValidateUser.mockResolvedValue(null)

    await expect(loginUseCase.execute(loginUser)).rejects.toThrow(AuthUnauthorizedHttpException)
  })

  it("should return token if user doctor exists", async() => {
    const loginUser:ILoginUser = { username:"doctor", password: "doctor" }
    const fakeUser:IUser = {
      id: 1, 
      username: "doctor", 
      password: "doctor", 
      role: "doctor"
    }
    
    const fakeToken = "fake.token"

    authRepoMock.ValidateUser.mockResolvedValue(fakeUser)
    jwtServiceMock.signAsync.mockResolvedValue(fakeToken)

    const result = await loginUseCase.execute(loginUser)
   
    expect(result).toEqual({token: fakeToken})
  })

  it("should return token if user patient exists", async() => {
    const loginUser:ILoginUser = { username:"patient", password: "patient" }
    const fakeUser:IUser = {
      id: 2, 
      username: "patient", 
      password: "patient", 
      role: "patient"
    }
    
    const fakeToken = "fake.token"

    authRepoMock.ValidateUser.mockResolvedValue(fakeUser)
    jwtServiceMock.signAsync.mockResolvedValue(fakeToken)

    const result = await loginUseCase.execute(loginUser)
   
    expect(result).toEqual({token: fakeToken})
  })

})