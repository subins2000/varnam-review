import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Vote {
  @Column()
  ip: string
}
