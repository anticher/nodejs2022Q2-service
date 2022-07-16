import { Album } from 'src/albums/interfaces/album.model';
import { Artist } from 'src/artists/interfaces/artist.model';

export interface Track {
  id?: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface TrackResponse {
  id?: string;
  name: string;
  artist: Artist | null;
  album: Album | null;
  duration: number;
}
