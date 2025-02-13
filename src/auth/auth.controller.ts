import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto, signInWithEmail } from './dto/auth.dto';
import { validateAccountDto } from './dto/validate.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: signUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  async signIn(@Req() req) {
    return await this.authService.signIn(req.user);
  }

  @Post('validate-account')
  async validateAccount(@Body() validateDto: validateAccountDto) {
    return await this.authService.validateAccount(validateDto);
  }

  @Post('refresh-token')
  async refreshToken(@Body() data:{sessionId: string}){
    return await this.authService.refreshtoken(data.sessionId)
  }
}
