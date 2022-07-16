import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create.dto';
import { UpdateTrackDto } from './dto/update.dto';
import { TrackResponse } from './interfaces/track.model';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}
  @Post()
  create(@Body(new ValidationPipe()) track: CreateTrackDto): TrackResponse {
    return this.tracksService.create(track);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(new ValidationPipe()) track: UpdateTrackDto,
  ): TrackResponse {
    return this.tracksService.update(id, track);
  }

  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): void {
    return this.tracksService.delete(id);
  }

  @Get(':id')
  getById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): TrackResponse {
    return this.tracksService.getTrack(id);
  }

  @Get()
  getAll(): TrackResponse[] {
    return this.tracksService.getAll();
  }
}
