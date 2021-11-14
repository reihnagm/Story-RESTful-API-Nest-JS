import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Auth {
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
    length: "255"
  })
  displayName: any;

  @Column({
    type: "varchar",
    length: "255"
  })
  email: any;

  @Column({
    type: "varchar",
    length: "255"
  })
  phone: any;

  @Column({
    type: "varchar",
    length: "255",
  })
  password: any;

  @CreateDateColumn()
  createdAt: any;

  @UpdateDateColumn()
  updatedAt: any;
}