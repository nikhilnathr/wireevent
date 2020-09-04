import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from "typeorm";
import * as bcrypt from "bcryptjs";
// import { Task } from '../tasks/task.entity';

@Entity()
@Unique(["email"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  fname: string;

  @Column()
  lname: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  // @OneToMany(
  //   type => Task,
  //   task => task.user,
  //   { eager: true },
  // )
  // tasks: Task[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}