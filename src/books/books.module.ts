import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { HelperModule } from 'src/libs/utils/helper.module';
import { helperService } from 'src/libs/utils/helper.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), HelperModule],
  controllers: [BooksController],
  providers: [BooksService, helperService],
})
export class BooksModule {}
