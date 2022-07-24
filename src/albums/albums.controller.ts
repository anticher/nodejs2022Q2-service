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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create.dto';
import { UpdateAlbumDto } from './dto/update.dto';
import { AlbumResponse } from './interfaces/album.model';

@ApiTags('Album')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}
  @ApiOperation({
    summary: 'Add new album',
    description: 'Add new album information',
  })
  @ApiResponse({
    status: 201,
    description: 'The album has been successfully created.',
    type: AlbumResponse,
  })
  @ApiResponse({ status: 400, description: 'AlbumId is invalid' })
  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true })) album: CreateAlbumDto,
  ): AlbumResponse {
    return this.albumsService.create(album);
  }

  @ApiOperation({
    summary: 'Update album',
    description: 'Update album information',
  })
  @ApiResponse({
    status: 200,
    description: 'The album has been successfully updated.',
    type: AlbumResponse,
  })
  @ApiResponse({ status: 400, description: 'AlbumId is invalid' })
  @ApiResponse({ status: 404, description: 'Album is not exist' })
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(new ValidationPipe({ whitelist: true })) album: UpdateAlbumDto,
  ): AlbumResponse {
    return this.albumsService.update(id, album);
  }

  @ApiOperation({
    summary: 'Delete album',
    description: 'Delete album information',
  })
  @ApiResponse({
    status: 204,
    description: 'The album has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'AlbumId is invalid' })
  @ApiResponse({ status: 404, description: 'Album is not exist' })
  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): void {
    return this.albumsService.delete(id);
  }

  @ApiOperation({
    summary: 'Get album by id',
    description: 'Get album information',
  })
  @ApiResponse({
    status: 200,
    description: 'Gets album information',
    type: AlbumResponse,
  })
  @ApiResponse({ status: 400, description: 'AlbumId is invalid' })
  @ApiResponse({ status: 404, description: 'Album is not exist' })
  @Get(':id')
  getById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): AlbumResponse {
    return this.albumsService.getAlbum(id);
  }

  @ApiOperation({
    summary: 'Get all albums',
    description: 'Get albums information',
  })
  @ApiResponse({
    status: 200,
    description: 'Gets albums information',
    type: [AlbumResponse],
  })
  @Get()
  getAll(): AlbumResponse[] {
    return this.albumsService.getAll();
  }
}
