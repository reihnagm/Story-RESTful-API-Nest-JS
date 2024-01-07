import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StoryContents {
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
  background_color: any;

  @Column({
    type: "tinyint",
    default: 0
  })
  is_background_color: any;

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