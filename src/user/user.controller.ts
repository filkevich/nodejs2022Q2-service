import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  HttpCode,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser, TUserId } from './user.model';
import CreateUserDto from './dtos/createUser.dto';
import UpdatePasswordDto from './dtos/updatePassword.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): IUser[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: TUserId) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: TUserId,
    @Body() updateUserDto: UpdatePasswordDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: TUserId) {
    return this.userService.delete(id);
  }
}
