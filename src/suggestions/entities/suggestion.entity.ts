import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Vote } from './vote.entity';

@Entity()
export class Suggestion {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  lang: string;

  @Column()
  pattern: string;

  @Column()
  word: string;

  @Column(type => Vote)
  votes: Vote[]
}

export interface SuggestionWithVoteCount extends Omit<Suggestion, 'votes'> {
  votes: number
}
