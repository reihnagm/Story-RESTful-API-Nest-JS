import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stories {
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
  caption: any;

  @Column({
    type: "varchar",
    length: "36"
  })
  type: any;

  @Column({
    type: "varchar",
    length: "255",
    default: ''
  })
  media: any;

  @Column({
    type: "varchar",
    length: "255",
    default: ''
  })
  background_color: any;

  @Column({
    type: "varchar",
    length: "255",
    default: ''
  })
  text_color: any;

  @Column({
    type: "varchar",
    length: "255",
    default: ''
  })
  duration: any;

  @Column({
    type: "varchar",
    length: "36",
    default: ''
  })
  user_id: any;

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