import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesRepsonse } from './interfaces/favourite';

@Controller('favs')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Post('artist/:id')
  addArtist(@Param('id') id: string): void {
    return this.favouritesService.addArtist(id);
  }

  @Delete('artist/:id')
  deleteArtist(@Param('id') id: string): void {
    return this.favouritesService.deleteArtist(id);
  }

  @Post('album/:id')
  addAlbum(@Param('id') id: string): void {
    return this.favouritesService.addAlbum(id);
  }

  @Delete('album/:id')
  deleteAlbum(@Param('id') id: string): void {
    return this.favouritesService.deleteAlbum(id);
  }

  @Post('track/:id')
  addTrack(@Param('id') id: string): void {
    return this.favouritesService.addTrack(id);
  }

  @Delete('track/:id')
  deleteTrack(@Param('id') id: string): void {
    return this.favouritesService.deleteTrack(id);
  }

  @Get()
  getAll(): FavouritesRepsonse {
    return this.favouritesService.getAll();
  }

  // DELETE /favs/artist/:id - delete artist from favorites
  // Server should answer with status code 204 if the artist was in favorites and now it's deleted id is found and deleted
  // Server should answer with status code 400 and corresponding message if artistId is invalid (not uuid)
  // Server should answer with status code 404 and corresponding message if corresponding artist is not favorite
  // @Post()
  // create(@Body() artist: CreateArtistDto): ArtistResponse {
  //   return this.artistsService.create(artist);
  // }

  //   @Put(':id')
  //   update(
  //     @Param('id') id: string,
  //     @Body() artist: UpdateArtistDto,
  //   ): ArtistResponse {
  //     return this.artistsService.update(id, artist);
  //   }

  // @Delete(':id')
  // delete(@Param('id') id: string): void {
  //   return this.artistsService.delete(id);
  // }

  //   @Get(':id')
  //   getById(@Param('id') id: string): ArtistResponse {
  //     return this.artistsService.getArtist(id);
  //   }

  // @Get()
  // getAll(): ArtistResponse[] {
  //   return this.artistsService.getAll();
  // }
}
