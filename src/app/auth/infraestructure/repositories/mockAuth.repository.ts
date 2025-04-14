import { Injectable } from "@nestjs/common";
import { ILoginUser, IUser } from "../../domain/IUser";
import { AuthRepository } from "../../domain/repositories/Auth.repository";

export class MockAuthRepository  implements AuthRepository {
  private readonly users: IUser[] = [
    {id: 1, username: "patient", password: "patient" , role: "patient"},
    {id: 2, username: "doctor", password: "doctor", role: "doctor"},
  ]

  async ValidateUser({ username, password }: ILoginUser): Promise<IUser | null> {
    const selectUser = this.users.find((u:IUser)=> u.username === username && u.password === password)
    return selectUser || null
  }

}