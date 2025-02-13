import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { OTP } from './entities/otp.entity';
import { Session } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { helperService } from 'src/libs/utils/helper.service';
import { HelperModule } from 'src/libs/utils/helper.module';
import { MailModule } from 'src/libs/application/mail/mail.module';
import { MaileService } from 'src/libs/application/mail/mail.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/auth.strategy';
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User, OTP, Session]),
    HelperModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    Repository<User>,
    Repository<OTP>,
    Repository<Session>,
    helperService,
    MaileService,
    JwtStrategy,
    LocalStrategy,
  ],
})
export class AuthModule {}
