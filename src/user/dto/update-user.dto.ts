import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UserAccountState } from '../enums/user.enum';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class UpdateAccountState {
  accountState: UserAccountState;
}

export class UpdateUserSession {
  @IsString()
  @IsNotEmpty()
  sessionId: string;
}
