import { Module } from '@nestjs/common';
import { helperService } from './helper.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [helperService],
  exports: [helperService],
})
export class HelperModule {}
