import { Column, Entity } from 'typeorm';

@Entity()
export class Suggestion {
  @Column()
  lang: string;

  @Column()
  pattern: string;

  @Column()
  word: string;
}
