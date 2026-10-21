import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { CircuitNode, CircuitWire } from './simulator.service';

@Entity('circuits')
export class CircuitEntity {
  @PrimaryColumn({ type: 'varchar', length: 120 })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 120, default: 'Personalizado' })
  category: string;

  @Column({ type: 'varchar', length: 120, default: 'Módulo Digital' })
  moduleTag: string;

  @Column({ type: 'text', default: '' })
  description: string;

  @Column({ type: 'jsonb', default: [] })
  formulas: string[];

  @Column({ type: 'jsonb', default: [] })
  nodes: CircuitNode[];

  @Column({ type: 'jsonb', default: [] })
  wires: CircuitWire[];

  @Column({ type: 'boolean', default: false })
  isPreset: boolean;

  @Column({ type: 'varchar', length: 120, nullable: true })
  userId: string | null;

  @Column({ type: 'varchar', length: 120, nullable: true })
  authorName: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
