import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { User } from "src/user/user.entity";
import { Event } from "../event/event.entity";

@Entity()
export class Organisation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    type => User,
    user => user.organisations,
    { eager: true, nullable: false },
  )
  owner: User;

  @OneToMany(
    type => Event,
    event => event.organiser,
    { eager: false },
  )
  events: Event[];
}
