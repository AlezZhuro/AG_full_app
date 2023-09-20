import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Subtask } from './Subtask';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  completed: boolean;

  @OneToMany(() => Subtask, subtask => subtask.task)
  subtasks: Subtask[];
}
