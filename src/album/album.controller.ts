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
import { AlbumService } from './album.service';
import { IAlbum, TAlbumId } from './album.model';
import CreateAlbumDto from './dtos/createAlbum.dto';
import UpdateAlbumDto from './dtos/updateAlbum.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll(): IAlbum[] {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: TAlbumId,
  ): IAlbum {
    return this.albumService.findOne(id);
  }

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto): IAlbum {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: TAlbumId,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): IAlbum {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: TAlbumId) {
    return this.albumService.delete(id);
  }
}
