export enum EPermission {
  STUDENT = 0,
  TEACHER = 1,
  ADMIN = 2,
}
export interface IUser {
  id?: number;
  username: string;
  email?: string;
  password: string;
  permission_type: EPermission;
}

export interface IUserUpdate {
  id: number;
  username?: string;
  email?: string;
  password?: string;
}
