import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/albums/interfaces/album.model';
import { Artist } from 'src/artists/interfaces/artist.model';
import { Track } from 'src/tracks/interfaces/track.model';

export interface Favourites {
  artistIds: string[];
  albumIds: string[];
  trackIds: string[];
}

export class FavouritesResponse {
  @ApiProperty()
  artists: Artist[];

  @ApiProperty()
  albums: Album[];

  @ApiProperty()
  tracks: Track[];
}
