import { roleUser } from "src/app/auth/domain/IUser";

export const doctorIaPermissionsConstants: Record<'getLogs', roleUser[]> = {
  getLogs: ['doctor']
}