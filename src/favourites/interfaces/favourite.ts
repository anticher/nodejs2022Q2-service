import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/albums/models/album.model';
import { Artist } from 'src/artists/models/artist.model';
import { Track } from 'src/tracks/models/track.model';

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
