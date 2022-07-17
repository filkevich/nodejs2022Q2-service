import { Injectable } from '@nestjs/common';
import { IUser } from './user.model';
import database from 'src/db/db.service';

@Injectable()
export class UserService {
  findAll(): IUser[] {
    return database.users;
  }
}
