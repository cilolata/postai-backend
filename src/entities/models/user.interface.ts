export enum EPermission {
    STUDENT = 0,
    TEACHER = 1
  }
  export interface IUser {
    id?: number;
    username: string;
    email?: string;
    password: string;
    permission_type: EPermission;
  }
  