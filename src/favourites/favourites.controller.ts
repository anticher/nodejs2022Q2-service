import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FavouritesService } from './favourites.service';
import { FavouritesResponse } from './interfaces/favourite';

@ApiTags('Favourite')
@Controller('favs')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}
  @ApiOperation({
    summary: 'Add favourite artist',
    description: 'Add new favourite artist',
  })
  @ApiResponse({
    status: 201,
    description: 'The artist has been successfully added.',
  })
  @ApiResponse({ status: 400, description: 'ArtistId is invalid' })
  @ApiResponse({ status: 422, description: 'Artist is not exist' })
  @Post('artist/:id')
  addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): void {
    return this.favouritesService.addArtist(id);
  }

  @ApiOperation({
    summary: 'Delete favourite artist',
    description: 'Delete artist from favourite',
  })
  @ApiResponse({
    status: 204,
    description: 'The artist has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'ArtistId is invalid' })
  @ApiResponse({ status: 404, description: 'Artist is not exist' })
  @Delete('artist/:id')
  deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): void {
    return this.favouritesService.deleteArtist(id);
  }

  @ApiOperation({
    summary: 'Add favourite album',
    description: 'Add new favourite album',
  })
  @ApiResponse({
    status: 201,
    description: 'The album has been successfully added.',
  })
  @ApiResponse({ status: 400, description: 'AlbumId is invalid' })
  @ApiResponse({ status: 422, description: 'Album is not exist' })
  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): void {
    return this.favouritesService.addAlbum(id);
  }

  @ApiOperation({
    summary: 'Delete favourite album',
    description: 'Delete album from favourite',
  })
  @ApiResponse({
    status: 204,
    description: 'The album has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'AlbumId is invalid' })
  @ApiResponse({ status: 404, description: 'Album is not exist' })
  @Delete('album/:id')
  deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): void {
    return this.favouritesService.deleteAlbum(id);
  }

  @ApiOperation({
    summary: 'Add favourite track',
    description: 'Add new favourite track',
  })
  @ApiResponse({
    status: 201,
    description: 'The track has been successfully added.',
  })
  @ApiResponse({ status: 400, description: 'TrackId is invalid' })
  @ApiResponse({ status: 422, description: 'Track is not exist' })
  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): void {
    return this.favouritesService.addTrack(id);
  }

  @ApiOperation({
    summary: 'Delete favourite track',
    description: 'Delete track from favourite',
  })
  @ApiResponse({
    status: 204,
    description: 'The track has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'TrackId is invalid' })
  @ApiResponse({ status: 404, description: 'Track is not exist' })
  @Delete('track/:id')
  deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): void {
    return this.favouritesService.deleteTrack(id);
  }

  @ApiOperation({
    summary: 'Get all favourites',
    description: 'Get favourites records',
  })
  @ApiResponse({
    status: 200,
    description: 'Gets favourites information',
    type: FavouritesResponse,
  })
  @Get()
  getAll(): FavouritesResponse {
    return this.favouritesService.getAll();
  }
}
