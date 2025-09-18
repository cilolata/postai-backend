import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EPermission, IUser } from "./models/user.interface";

@Entity({
  name: "users",
})
export class Users implements IUser {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
  })
  id?: number | undefined 
  @Column("varchar")
  username: string;
  @Column("varchar")
  password: string;
  @Column("varchar")
  email?: string;
  @Column({
    name: "permission_type",
    type: "enum",
    enum: EPermission,
    default: EPermission.STUDENT,
  })
  permission_type: EPermission;
}
