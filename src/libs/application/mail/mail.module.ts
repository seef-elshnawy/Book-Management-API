import { Module, Global } from '@nestjs/common';
import { MaileService } from './mail.service';
import { BullModule } from '@nestjs/bull';
import { HelperModule } from 'src/libs/utils/helper.module';
import { helperService } from 'src/libs/utils/helper.service';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'mail',
    }),
    HelperModule
  ],
  providers: [MaileService, helperService],
  exports: [MaileService],
})
export class MailModule {}
