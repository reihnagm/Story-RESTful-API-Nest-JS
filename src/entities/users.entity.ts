import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Stories } from './stories.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: any;

  @Column({ unique: true, generated: 'uuid'})
  uid: string;

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

  @OneToMany(() => Stories, (stories) => stories.user)
  stories: Stories[]
}