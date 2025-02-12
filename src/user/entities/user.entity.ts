import { Book } from 'src/books/entities/book.entity';
import { BaseModel } from 'src/libs/database/base.model';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseModel {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Book, (book) => book.userId, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  books: Book[];
}
