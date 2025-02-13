import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IMailService, MailDetails } from './mail.type';
import { QueueService } from '../queue/queue.service';
import * as os from 'os';
import { Process } from '@nestjs/bull';
import { helperService } from 'src/libs/utils/helper.service';

const nodemailer = require('nodemailer');

@Injectable()
export class MaileService implements IMailService {
  private transporter: any;

  constructor(
    private readonly configService: ConfigService,
    private queueService: QueueService,
    private helperService: helperService,
  ) {
    this.queueService.createQueue(
      'mail',
      undefined,
      this.processMailJop.bind(this),
    );

    this.transporter = nodemailer.createTransport({
      host: this.configService.get('EMAIL_HOST'),
      secure: true,
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  public async send(input: MailDetails): Promise<void> {
    this.queueService.addToQueue('mail', { input });
    return;
  }

  @Process({
    name: 'mailJob',
    concurrency: os.cpus().length,
  })
  private async processMailJop(job: any) {
    try {
      console.log('done');
      const input = job.data ? job.data.input : job.input;
      const { to, otpCode, from, subject } = input;
      const html = this.helperService.getHtml(otpCode);
      await this.transporter.sendMail({
        from: this.configService.get('EMAIL_USER'),
        to,
        subject,
        html,
      });
    } catch (err) {
      throw err;
    }
  }
}
