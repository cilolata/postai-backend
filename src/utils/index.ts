import { EPermission } from "../entities/models/user.interface";

export const fromDbPermission = (dbPerm: number): EPermission => {
    if (dbPerm === 0) return EPermission.STUDENT;
    if (dbPerm === 1) return EPermission.TEACHER;
    throw new Error(`Invalid permission code: ${dbPerm}`);
  };

  export const removeUndefinedValues = (obj: { [x: string]: any; }) => {
    for (const key in obj) {
      if (obj[key] === undefined) {
        delete obj[key];
      }
    }
    return obj;
  };