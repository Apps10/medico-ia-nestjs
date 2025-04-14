export type roleUser =  'patient' | 'doctor'

export interface IUser {
  id: number
  username: string
  password: string;
  role: roleUser;
}

export interface ILoginUser extends Pick<IUser, 'password'| 'username'> {}