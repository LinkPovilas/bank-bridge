import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  // TODO: upadate this [service, admin]
  @Column({ default: 'service' })
  role: string;

  @Column({ default: false })
  approved: boolean;
}
