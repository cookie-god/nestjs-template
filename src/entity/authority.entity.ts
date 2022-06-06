import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Authority')
export class Authority {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, nullable: false })
  type: string;

  @Column({ length: 20, nullable: false })
  check: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;

  @Column({ default: 'ACTIVE' })
  status: string;
}
