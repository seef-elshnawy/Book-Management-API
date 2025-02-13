import { Controller, Post, Body, UseGuards, Req, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto, signInWithEmail } from './dto/auth.dto';
import { validateAccountDto } from './dto/validate.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('api')
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

  @Post('signout')
  async signOut(@Body() data: { sessionId: string }) {
    return await this.authService.signOut(data.sessionId);
  }

  @Post('validate-account')
  async validateAccount(@Body() validateDto: validateAccountDto) {
    return await this.authService.validateAccount(validateDto);
  }

  @Put('refresh-token')
  async refreshToken(@Body() data: { sessionId: string }) {
    return await this.authService.refreshtoken(data.sessionId);
  }
}
