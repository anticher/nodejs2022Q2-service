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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create.dto';
import { UpdateArtistDto } from './dto/update.dto';
import { Artist } from './models/artist.model';

@ApiTags('Artist')
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @ApiOperation({
    summary: 'Add new artist',
    description: 'Add new artist information',
  })
  @ApiResponse({
    status: 201,
    description: 'The artist has been successfully created.',
    type: Artist,
  })
  @ApiResponse({ status: 400, description: 'ArtistId is invalid' })
  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true })) artist: CreateArtistDto,
  ): Promise<Artist> {
    return this.artistsService.create(artist);
  }

  @ApiOperation({
    summary: 'Update artist',
    description: 'Update artist information',
  })
  @ApiResponse({
    status: 200,
    description: 'The artist has been successfully updated.',
    type: Artist,
  })
  @ApiResponse({ status: 400, description: 'ArtistId is invalid' })
  @ApiResponse({ status: 404, description: 'Artist is not exist' })
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(new ValidationPipe({ whitelist: true })) artist: UpdateArtistDto,
  ): Promise<Artist> {
    return this.artistsService.update(id, artist);
  }

  @ApiOperation({
    summary: 'Delete artist',
    description: 'Delete artist information',
  })
  @ApiResponse({
    status: 204,
    description: 'The artist has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'ArtistId is invalid' })
  @ApiResponse({ status: 404, description: 'Artist is not exist' })
  @Delete(':id')
  delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.artistsService.delete(id);
  }

  @ApiOperation({
    summary: 'Get artist by id',
    description: 'Get artist information',
  })
  @ApiResponse({
    status: 200,
    description: 'Gets artist information',
    type: Artist,
  })
  @ApiResponse({ status: 400, description: 'ArtistId is invalid' })
  @ApiResponse({ status: 404, description: 'Artist is not exist' })
  @Get(':id')
  getById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Artist> {
    return this.artistsService.getArtist(id);
  }

  @ApiOperation({
    summary: 'Get all artists',
    description: 'Get artists information',
  })
  @ApiResponse({
    status: 200,
    description: 'Gets artists information',
    type: [Artist],
  })
  @Get()
  getAll(): Promise<Artist[]> {
    return this.artistsService.getAll();
  }
}
