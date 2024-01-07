import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StoryContentTypes {
  @PrimaryGeneratedColumn({
    type: "int",
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

  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
  created_at: any;

  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
  updated_at: any;
}