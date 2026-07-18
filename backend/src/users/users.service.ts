import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { UserProfileDto } from './dto/user-profile.dto';

type UserWithPassword = UserProfileDto & { password: string };

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserWithPassword> {
    return await this.usersRepository.create(createUserDto);
  }

  async findByEmail(email: string): Promise<UserWithPassword | null> {
    return await this.usersRepository.findByEmail(email);
  }

  async findById(id: string): Promise<UserProfileDto> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundException("User doesn't exists");
    return user;
  }
}
