import { Book } from 'src/books/entities/book.entity';
import { BaseModel } from 'src/libs/database/base.model';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { UserAccountState } from '../enums/user.enum';
import { Session } from 'src/auth/entities/auth.entity';
@Entity()
export class User extends BaseModel {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ enum: UserAccountState, default: UserAccountState.INACTIVE })
  accountState: UserAccountState;

  @OneToOne(() => Session, (session) => session.user, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'sessionId' })
  session: Session;

  @Column({ nullable: true, name: 'sessionId' })
  sessionId: string;
}
