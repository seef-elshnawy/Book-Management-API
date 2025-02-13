import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ResponseData } from '../types/response';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Injectable()
export class helperService {
  constructor(
    private configService: ConfigService,
    private jwt: JwtService,
  ) {}
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  generateOTP() {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }

  generateAuthToken(id: string, isTemporary = false): string {
    return jwt.sign({ userId: id }, this.configService.get('JWT_SECRET'), {
      ...(isTemporary && { expiresIn: 30 * 60 }),
    });
  }

  async signToken(userId: string): Promise<{ access_token: string }> {
    const data = { userId };
    const secret = this.configService.get('SECRET_KEY');
    const token = await this.jwt.signAsync(data, {
      expiresIn: '15m',
      secret,
    });
    return {
      access_token: token,
    };
  }
  async generateRefreshToken(
    userId: string,
  ): Promise<{ refresh_token: string }> {
    const data = { userId };
    const secret = this.configService.get('SECRET_KEY');
    const token = await this.jwt.signAsync(data, {
      expiresIn: '7d',
      secret,
    });
    return {
      refresh_token: token,
    };
  }
  async validateToken(token: string): Promise<{
    userId: string;
    expiresIn: Date;
  }> {
    const secret = this.configService.get('SECRET_KEY');
    return await this.jwt.verifyAsync(token, {
      secret,
    });
  }

  handleResponseData<T>(
    data: T,
    code?: number,
    message?: string,
  ): ResponseData<typeof data> {
    return {
      code: code ? code : 200,
      data,
      message: message ? message : 'successfull',
    };
  }

  getHtml(otpCode: string) {
    const style = `
    h1 {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    p {
      font-size: 16px;
      margin-bottom: 10px;
      text-align: justify;
    }
    .verification-code {
      font-weight: bold;
      font-size: 18px;
    }
`;
    return `<html>
                  <head>
                    <style>${style}</style>
                  </head>
                  <body>
                    <h1>Welcome to Book App</h1>
                    <p>Thank you for signing up for Book App. To complete your registration, we need to verify your email address.</p>
                    <p>Please enter the following OTP (One Time Password) in the app to verify your email address: <span class="verification-code">${otpCode}</span></p>
                    <p>If you did not sign up for Rigow or did not request this OTP, please ignore this email.</p>
                    <br>
                    <p>Best regards,</p>
                    <p>Rigow Team</p>
                  </body>
              </html>`;
  }
}
