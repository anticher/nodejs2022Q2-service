import { Album } from 'src/albums/interfaces/album.model';
import { Artist } from 'src/artists/interfaces/artist.model';
import { Track } from 'src/tracks/interfaces/track.model';

export interface Favourites {
  artistIds: string[];
  albumIds: string[];
  trackIds: string[];
}

export interface FavouritesRepsonse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
