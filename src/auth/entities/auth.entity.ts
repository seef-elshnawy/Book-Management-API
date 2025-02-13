import { BaseModel } from 'src/libs/database/base.model';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Session extends BaseModel {
  @Column()
  refreshToken: string;

  @OneToOne(() => User, (user) => user.session, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ name: 'userId' })
  userId: string;
}
