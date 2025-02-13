import { BaseModel } from 'src/libs/database/base.model';
import { Column, Entity } from 'typeorm';

@Entity()
export class OTP extends BaseModel {
  @Column()
  userId: string;
  @Column()
  otp: string;
  @Column()
  expiresAt: Date;
  @Column({ default: false })
  used: Boolean;
}
