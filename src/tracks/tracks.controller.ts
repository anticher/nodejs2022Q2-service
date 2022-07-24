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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTrackDto } from './dto/create.dto';
import { UpdateTrackDto } from './dto/update.dto';
import { Track } from './models/track.model';
import { TracksService } from './tracks.service';

@ApiTags('Track')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}
  @ApiOperation({
    summary: 'Add new track',
    description: 'Add new track information',
  })
  @ApiResponse({
    status: 201,
    description: 'The track has been successfully created.',
    type: Track,
  })
  @ApiResponse({ status: 400, description: 'TrackId is invalid' })
  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true })) track: CreateTrackDto,
  ): Promise<Track> {
    return this.tracksService.create(track);
  }

  @ApiOperation({
    summary: 'Update track',
    description: 'Update track information',
  })
  @ApiResponse({
    status: 200,
    description: 'The track has been successfully updated.',
    type: Track,
  })
  @ApiResponse({ status: 400, description: 'TrackId is invalid' })
  @ApiResponse({ status: 404, description: 'Track is not exist' })
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(new ValidationPipe({ whitelist: true })) track: UpdateTrackDto,
  ): Promise<Track> {
    return this.tracksService.update(id, track);
  }

  @ApiOperation({
    summary: 'Delete track',
    description: 'Delete track information',
  })
  @ApiResponse({
    status: 204,
    description: 'The track has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'TrackId is invalid' })
  @ApiResponse({ status: 404, description: 'Track is not exist' })
  @Delete(':id')
  delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.tracksService.delete(id);
  }

  @ApiOperation({
    summary: 'Get track by id',
    description: 'Get track information',
  })
  @ApiResponse({
    status: 200,
    description: 'Gets track information',
    type: Track,
  })
  @ApiResponse({ status: 400, description: 'TrackId is invalid' })
  @ApiResponse({ status: 404, description: 'Track is not exist' })
  @Get(':id')
  getById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Track> {
    return this.tracksService.getTrack(id);
  }

  @ApiOperation({
    summary: 'Get all tracks',
    description: 'Get tracks information',
  })
  @ApiResponse({
    status: 200,
    description: 'Gets tracks information',
    type: [Track],
  })
  @Get()
  getAll(): Promise<Track[]> {
    return this.tracksService.getAll();
  }
}
