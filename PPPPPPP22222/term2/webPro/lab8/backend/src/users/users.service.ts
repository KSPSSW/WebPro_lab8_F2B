import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  lastId: number = 3;
  private users: User[] = [
    {
      id: 1,
      login: 'admin',
      password: 'admin@1234',
      roles: ['admin'],
      gender: 'male',
      age: 20,
    },
    {
      id: 2,
      login: 'user',
      password: 'user@1234',
      roles: ['user'],
      gender: 'female',
      age: 20,
    },
  ];

  create(createUserDto: CreateUserDto) {
    this.lastId++;
    const newUser = { ...createUserDto, id: this.lastId };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException('User not found');
    }
    this.users[index] = { ...this.users[index], ...updateUserDto };
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException('User not found');
    }
    const deletedUser = this.users[index];
    this.users.splice(index, 1);
    return deletedUser;
  }
}
