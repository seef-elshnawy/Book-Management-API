import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  author: string;
  @IsDate()
  @IsNotEmpty()
  publicationDate: Date;
  @IsNumber()
  @IsNotEmpty()
  NumberOfPages: number;
  @IsString()
  @IsNotEmpty()
  userId: string;
}
