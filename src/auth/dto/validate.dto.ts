import { IsNotEmpty, IsString } from 'class-validator';

export class validateAccountDto {
  @IsString()
  @IsNotEmpty()
  otpCode: string;
  @IsString()
  @IsNotEmpty()
  email: string;
}
