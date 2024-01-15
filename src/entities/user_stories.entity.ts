import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserStories {
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
    length: "36"
  })
  user_id: any;

  @Column({
    type: "varchar",
    length: "36"
  })
  story_id: any;

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