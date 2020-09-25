import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Vote {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  ip: string
}
