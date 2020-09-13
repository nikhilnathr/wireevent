import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import * as bcrypt from "bcryptjs";
import { UserRole } from "./user-role.enum";
import { Organisation } from "../organisation/organisation.entity";
// import { Task } from '../tasks/task.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  fname: string;

  @Column()
  lname: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  position: string;

  @Column({ nullable: true })
  institution: string;

  @Column({ nullable: true })
  website: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => Organisation,
    organisation => organisation.owner,
    { eager: false },
  )
  organisations: Organisation[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
