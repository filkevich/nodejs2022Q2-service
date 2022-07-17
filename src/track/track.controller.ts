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
import { TrackService } from './track.service';
import { ITrack, TTrackId } from './track.model';
import CreateTrackDto from './dtos/createTrack.dto';
import UpdateTrackDto from './dtos/updateTrack.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  findAll(): ITrack[] {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: TTrackId,
  ): ITrack {
    return this.trackService.findOne(id);
  }

  @Post()
  create(@Body() createTrackDto: CreateTrackDto): ITrack {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: TTrackId,
    @Body() updateTrackDto: UpdateTrackDto,
  ): ITrack {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: TTrackId) {
    return this.trackService.delete(id);
  }
}
