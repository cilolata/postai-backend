import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IPost } from "./models/post.interface";

@Entity({
  name: "posts",
})
export class Posts implements IPost {
  @PrimaryGeneratedColumn("increment", {
    name: "id",
  })
  id?: number | undefined;
  @Column("varchar")
  title: string;
  @Column("text")
  description: string;
  @Column("text")
  content: string;
  @Column("varchar")
  subject?: string;
  @Column({
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at?: Date;
  @Column({
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP",
  })
  updated_at: Date;
  @Column("integer", { name: "user_id" })
  user_id: number;
}
