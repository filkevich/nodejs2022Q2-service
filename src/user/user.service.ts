import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './user.model';
import database from 'src/db/db.service';
import { v4 as uuid } from 'uuid';
import CreateUserDto from './dtos/createUser.dto';

@Injectable()
export class UserService {
  findAll(): IUser[] {
    return database.users;
  }

  findOne(id: string): IUser {
    const user = database.users.find((item: IUser) => item.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  create(createUserDto: CreateUserDto): IUser {
    const newUser: IUser = {
      id: uuid(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...createUserDto,
    };

    database.users.push(newUser);

    return { ...newUser, password: '********' };
  }
}
