import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('AdminSalt')
export class AdminSalt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  salt: string;

  @Column()
  adminId: number;
}
