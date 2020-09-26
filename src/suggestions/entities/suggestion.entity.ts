import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

export class Vote {
  ip: string

  constructor (ip: string) {
    this.ip = ip
  }
}

@Entity()
export class Suggestion {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  ip: string

  @Column()
  lang: string;

  @Column()
  pattern: string;

  @Column()
  word: string;

  @Column()
  votes: Vote[]
}

export interface SuggestionWithVoteCount extends Omit<Suggestion, 'votes'> {
  votes: number
}
