import { ILoginUser, IUser } from "../IUser";

export abstract class AuthRepository {
  abstract ValidateUser(logindto: ILoginUser): Promise<IUser | null>
}