import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser, TId } from './user.model';
import CreateUserDto from './dtos/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): IUser[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: TId) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
