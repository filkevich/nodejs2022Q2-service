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
import CreateArtistDto from './dtos/createArtist.dto';
import UpdateArtistDto from './dtos/updateArtist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  findAll(): IArtist[] {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: TArtistId,
  ): IArtist {
    return this.artistService.findOne(id);
  }

  @Post()
  create(@Body() createArtistDto: CreateArtistDto): IArtist {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: TArtistId,
    @Body() updateArtistDto: UpdateArtistDto,
  ): IArtist {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: TArtistId) {
    return this.artistService.delete(id);
  }
}
