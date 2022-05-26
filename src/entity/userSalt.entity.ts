import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserSalt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  salt: string;

  @Column()
  userId: number;
}
