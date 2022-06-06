import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ApiCallHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  historyType: string;

  @Column({ length: 45 })
  userType: string;

  @Column()
  savedId: number;

  @Column({ length: 255 })
  apiUrl: string;

  @Column({ length: 255 })
  apiName: string;

  @Column({ length: 45 })
  apiMethod: string;

  @Column({ type: 'text' })
  requestQuery: string;

  @Column({ type: 'text' })
  requestBody: string;

  @Column({ type: 'text' })
  requestPath: string;

  @Column({ type: 'text' })
  response: string;

  @Column()
  authority: number;

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
