import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create.dto';
import { UpdateTrackDto } from './dto/update.dto';
import { TrackResponse } from './interfaces/track.model';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}
  @Post()
  create(@Body() track: CreateTrackDto): TrackResponse {
    return this.tracksService.create(track);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() track: UpdateTrackDto,
  ): TrackResponse {
    return this.tracksService.update(id, track);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    return this.tracksService.delete(id);
  }

  @Get(':id')
  getById(@Param('id') id: string): TrackResponse {
    return this.tracksService.getTrack(id);
  }

  @Get()
  getAll(): TrackResponse[] {
    return this.tracksService.getAll();
  }
}
