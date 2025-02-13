import { ForbiddenException, Injectable } from '@nestjs/common';
import { signInWithEmail, signUpDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { OTP } from './entities/otp.entity';
import { helperService } from 'src/libs/utils/helper.service';
import { MaileService } from 'src/libs/application/mail/mail.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAccountState } from 'src/user/enums/user.enum';
import { validateAccountDto } from './dto/validate.dto';
import { Session } from './entities/auth.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @InjectRepository(OTP)
    private otpRepository: Repository<OTP>,
    private helperService: helperService,
    private mailService: MaileService,
    @InjectRepository(Session)
    private sessionRepo: Repository<Session>,
  ) {}

  async signUp(signUpDto: signUpDto) {
    try {
      const hashPassword = await this.helperService.hashPassword(
        signUpDto.password,
      );
      signUpDto.password = hashPassword;
      const user = await this.userService.create(signUpDto);
      const otpCode = this.helperService.generateOTP();
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 15);
      const otp = this.otpRepository.create({
        otp: otpCode,
        userId: user.id,
        expiresAt,
      });
      await this.otpRepository.save(otp);
      await this.sendEmailVerificationCode(user.email, otpCode);
      return 'otp is send to your email';
    } catch (err) {
      throw err;
    }
  }

  async validateAccount(validateDto: validateAccountDto) {
    const otp = await this.otpRepository.findOne({
      where: { otp: validateDto.otpCode },
    });
    if (!otp || Date.now() > otp.expiresAt.getTime() || otp.used === true)
      throw new ForbiddenException('otp is invalid');
    const user = await this.userService.findOne({ id: otp.userId });
    if (user.email !== validateDto.email)
      throw new ForbiddenException('something went wrong');
    await this.userService.update(user.id, {
      accountState: UserAccountState.ACTIVE,
    });
    await this.otpRepository.update(otp.id, { used: true });
    return 'Your Account validate sucessfully';
  }

  async validateUser(signInDto: signInWithEmail) {
    const user = await this.userService.findOne({ email: signInDto.email });
    if (!user || user.accountState === UserAccountState.INACTIVE)
      throw new ForbiddenException('invalid credintial');
    const passwordConfirmation = await this.helperService.comparePassword(
      signInDto.password,
      user.password,
    );
    if (!passwordConfirmation)
      throw new ForbiddenException('invalid credential');
    return user;
  }

  async signIn(user: User) {
    const { access_token } = await this.helperService.signToken(user.id);
    const { refresh_token } = await this.helperService.generateRefreshToken(
      user.id,
    );
    await this.sessionRepo.delete({ userId: user.id });
    const session = this.sessionRepo.create({
      refreshToken: refresh_token,
      userId: user.id,
    });
    await this.sessionRepo.save(session);
    await this.userService.update(user.id, { sessionId: session.id });
    return { access_token };
  }

  async refreshtoken(sessionId: string): Promise<{ access_token: string }> {
    const session = await this.sessionRepo.findOne({
      where: { id: sessionId },
    });
    if (!session) throw new ForbiddenException('something went wrong');
    const dataDecoded = await this.helperService.validateToken(
      session.refreshToken,
    );
    if (!dataDecoded) throw new ForbiddenException('something went wrong');
    const newToken = await this.helperService.signToken(dataDecoded.userId);
    const { refresh_token } = await this.helperService.generateRefreshToken(
      dataDecoded.userId,
    );
    this.sessionRepo.update(session.id, { refreshToken: refresh_token });
    return newToken;
  }

  async sendEmailVerificationCode(email: string, otpCode: string) {
    await this.mailService.send({ to: email, otpCode });
  }
}
