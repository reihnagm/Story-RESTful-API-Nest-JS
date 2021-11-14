import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class StoryViewType {
  @PrimaryGeneratedColumn({
    type: "int",
    unsigned: true,    
  })
  id: any;

  @Column({
    type: "varchar",
    unique: true,
    length: "36"
  })
  uid: any;

  @Column({
    type: "varchar",
    length: "20"
  })
  type: any;

  @CreateDateColumn()
  createdAt: any;

  @UpdateDateColumn()
  updatedAt: any;
}