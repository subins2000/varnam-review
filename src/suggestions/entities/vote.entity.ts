import { Column, Entity } from 'typeorm';

@Entity()
export class Vote {
  @Column()
  sid: string;

  @Column()
  ip: string
}
