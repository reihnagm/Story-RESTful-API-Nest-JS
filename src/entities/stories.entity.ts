import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './users.entity';
import { StoryTypes } from './story_types.entity';

@Entity()
export class Stories {
  @PrimaryGeneratedColumn()
  id: any;

  @Column({ unique: true, generated: 'uuid'})
  uid: string;

  @Column({
    type: "longtext"
  })
  caption: any;

  @Column({
    type: "varchar",
    length: "36"
  })
  user_id: any;

  @Column({
    type: "varchar",
    length: "36"
  })
  type_id: any;

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
    type: 'datetime',
    default: () => 'NOW()',
  })
  created_at: any;

  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
  updated_at: any;

  @ManyToOne(() => Users, (users) => users.stories, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName:'uid'
  })
  user: Users

  @ManyToOne(() => StoryTypes, (StoryTypes) => StoryTypes.stories, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: 'type_id',
    referencedColumnName:'uid'
  })
  type: StoryTypes
}