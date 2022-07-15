import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create.dto';
import { UpdateAlbumDto } from './dto/update.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}
  @Post()
  create(@Body() album: CreateAlbumDto): AlbumResponse {
    return this.albumsService.create(album);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() album: UpdateAlbumDto,
  ): AlbumResponse {
    return this.albumsService.update(id, album);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    return this.albumsService.delete(id);
  }

  @Get(':id')
  getById(@Param('id') id: string): AlbumResponse {
    return this.albumsService.getAlbum(id);
  }

  @Get()
  getAll(): AlbumResponse[] {
    return this.albumsService.getAll();
  }
}
