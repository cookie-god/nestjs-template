import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ApiCallHistory')
export class ApiCallHistory {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 45, default: null })
  historyType: string;

  @Column({ length: 45, default: null })
  userType: string;

  @Column()
  savedId: number;

  @Column({ length: 255, default: null })
  apiUri: string;

  @Column({ length: 255, default: null })
  apiName: string;

  @Column({ length: 45, default: null })
  apiMethod: string;

  @Column({ type: 'text', default: null })
  requestQuery: string;

  @Column({ type: 'text', default: null })
  requestBody: string;

  @Column({ type: 'text', default: null })
  requestParams: string;

  @Column({ type: 'text', default: null })
  response: string;

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
