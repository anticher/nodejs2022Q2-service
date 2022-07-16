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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create.dto';
import { UpdateAlbumDto } from './dto/update.dto';
import { AlbumResponse } from './interfaces/album.model';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}
  @Post()
  create(@Body(new ValidationPipe()) album: CreateAlbumDto): AlbumResponse {
    return this.albumsService.create(album);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(new ValidationPipe()) album: UpdateAlbumDto,
  ): AlbumResponse {
    return this.albumsService.update(id, album);
  }

  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): void {
    return this.albumsService.delete(id);
  }

  @Get(':id')
  getById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): AlbumResponse {
    return this.albumsService.getAlbum(id);
  }

  @Get()
  getAll(): AlbumResponse[] {
    return this.albumsService.getAll();
  }
}
