import { Entity, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from './Profile';

@Entity()
export class Post {
  //id: 0, name: 'Michael Jordan', date: 'Today', message: 'Test test test?', likedByUser: false, highFivedByUser: false
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  created: Date;

  @ManyToOne(() => Profile, { nullable: true })
  @JoinColumn({
    name: 'profile_fk',
    referencedColumnName: 'id',
  })
  profile_fk: Profile;

  @ManyToMany(() => Profile, { cascade: ['insert', 'update'] })
  @JoinTable({
    name: 'post_likes_junction',
    joinColumn: {
      name: 'post_fk',
    },
    inverseJoinColumn: {
      name: 'profile_fk',
    },
  })
  profiles: Profile[];
}
