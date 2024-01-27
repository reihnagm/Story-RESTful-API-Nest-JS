import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Users } from './users.entity';
import { Stories } from './stories.entity';

@Entity()
export class UserStories {
  @PrimaryGeneratedColumn()
  id: any;

  @Column({ unique: true, generated: 'uuid'})
  uid: string;

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

  @ManyToOne(() => Users, (users) => users.stories, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName:'uid'
  })
  user: Users

  @ManyToOne(() => Stories, (stories) => stories.user, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: 'story_id',
    referencedColumnName:'uid'
  })
  story: Stories
}