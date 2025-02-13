import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { helperService } from 'src/libs/utils/helper.service';
import { ResponseData } from 'src/libs/types/response';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    private helperService: helperService,
  ) {}
  async create(createBookDto: CreateBookDto): Promise<ResponseData<Book>> {
    const book = this.bookRepository.create(createBookDto);
    console.log(book);
    book.publicationDate = new Date(book.publicationDate);
    const data = await this.bookRepository.save(book);
    return this.helperService.handleResponseData(data);
  }

  async findAll(): Promise<ResponseData<Book[]>> {
    const data = await this.bookRepository.find();
    return this.helperService.handleResponseData(data);
  }

  async findOne(id: string): Promise<ResponseData<Book> | {}> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) return {};
    return this.helperService.handleResponseData(book);
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<ResponseData<Book>> {
    await this.bookRepository.update(id, updateBookDto);
    const data = await this.bookRepository.findOne({ where: { id } });
    return this.helperService.handleResponseData(data)
  }

  async remove(id: string): Promise<ResponseData<String>> {
    await this.bookRepository.delete(id);
    const data = 'indicating the book was successfully deleted';
    return this.helperService.handleResponseData(data)
  }
}
