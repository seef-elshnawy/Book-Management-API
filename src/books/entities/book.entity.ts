import { BaseModel } from 'src/libs/database/base.model';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

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
}
