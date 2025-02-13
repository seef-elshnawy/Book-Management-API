import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, Repository<User>],
  exports: [UserService],
})
export class UserModule {}
