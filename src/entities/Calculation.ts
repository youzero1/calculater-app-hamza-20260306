import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('calculations')
export class Calculation {
  @PrimaryColumn('text')
  id!: string;

  @Column('text')
  expression!: string;

  @Column('text')
  result!: string;

  @Column({ type: 'integer', default: 0 })
  isShared!: boolean;

  @Column({ type: 'text', nullable: true })
  shareId!: string | null;

  @CreateDateColumn()
  createdAt!: Date;
}
