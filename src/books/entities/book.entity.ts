import { BaseModel } from 'src/libs/database/base.model';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Book extends BaseModel {
  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publicationDate: Date;

  @Column()
  NumberOfPages: number;

  @ManyToOne(() => User, (user) => user.books, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  user: User;

  @Column()
  userId: string;
}
