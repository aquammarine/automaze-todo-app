import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.create(createUserDto);
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findByEmail(email);
  }

  async findById(id: string) {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundException("User doesn't exists");
    return user;
  }
}
