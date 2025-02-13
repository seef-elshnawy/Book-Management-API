import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {
  UpdateAccountState,
  UpdateUserDto,
  UpdateUserSession,
} from './dto/update-user.dto';
import { FindOptionsRelations, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        if (error.detail.includes('username')) {
          throw new ConflictException('Username is already taken');
        } else if (error.detail.includes('email')) {
          throw new ConflictException('Email is already registered');
        }
        throw error;
      }
    }
  }

  async findOne(option: Partial<User>, relations?: FindOptionsRelations<User>) {
    return await this.userRepository.findOne({
      where: { ...option },
      relations,
    });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto | UpdateAccountState | UpdateUserSession,
  ) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return new Error('User not found');
    }
    await this.userRepository.update(user.id, updateUserDto);
    return `updated sucessfully`;
  }

  async remove(id: string) {
    return await this.userRepository.delete({ id });
  }
}
