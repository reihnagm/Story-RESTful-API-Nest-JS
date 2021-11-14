import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class StoryViewContent {
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
    type: "longtext"
  })
  content: any;

  @Column({
    type: "varchar",
    length: "36"
  })
  uid_content_type: any;

  @Column({
    type: "varchar",
    length: "255",
    default: ''
  })
  backgroundColor: any;

  @Column({
    type: "tinyint",
    default: 0
  })
  isBackgroundColor: any;

  @CreateDateColumn()
  createdAt: any;

  @UpdateDateColumn()
  updatedAt: any;
}