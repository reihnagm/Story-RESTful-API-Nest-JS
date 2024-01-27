import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Stories } from './stories.entity';

@Entity()
export class StoryTypes {
  @PrimaryGeneratedColumn()
  id: any;

  @Column({ unique: true, generated: 'uuid'})
  uid: string;

  @Column({
    type: "varchar",
    length: "20"
  })
  name: any;

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

  @OneToMany(() => Stories, (stories) => stories.type)
  stories: Stories[]
}