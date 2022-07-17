import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): IUser[] {
    return this.userService.findAll();
  }
}
