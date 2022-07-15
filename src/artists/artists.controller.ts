import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create.dto';
import { UpdateArtistDto } from './dto/update.dto';
import { ArtistResponse } from './interfaces/artist.model';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}
  @Post()
  create(@Body() artist: CreateArtistDto): ArtistResponse {
    return this.artistsService.create(artist);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() artist: UpdateArtistDto,
  ): ArtistResponse {
    return this.artistsService.update(id, artist);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    return this.artistsService.delete(id);
  }

  @Get(':id')
  getById(@Param('id') id: string): ArtistResponse {
    return this.artistsService.getArtist(id);
  }

  @Get()
  getAll(): ArtistResponse[] {
    return this.artistsService.getAll();
  }
}
