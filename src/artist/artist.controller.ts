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
import { ArtistService } from './artist.service';
import { IArtist, TArtistId } from './artist.model';
import CreateUserDto from './dtos/createArtist.dto';
import UpdatePasswordDto from './dtos/updateArtist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly userService: ArtistService) {}

  @Get()
  findAll(): IArtist[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: TArtistId,
  ): IArtist {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): IArtist {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: TArtistId,
    @Body() updateUserDto: UpdatePasswordDto,
  ): IArtist {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: TArtistId) {
    return this.userService.delete(id);
  }
}
