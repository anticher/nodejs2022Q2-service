import { Injectable } from '@nestjs/common';
import { Artist } from 'src/artists/models/artist.model';
import { Album } from 'src/albums/models/album.model';
import { Track, TrackResponse } from 'src/tracks/interfaces/track.model';
import { User } from 'src/users/models/user.model';
import { Favourites } from 'src/favourites/interfaces/favourite';

@Injectable()
export class IMDBService {
  static instance: IMDBService;

  constructor() {
    if (!IMDBService.instance) {
      IMDBService.instance = this;
    }

    return IMDBService.instance;
  }

  public artists: Artist[] = [];
  public albums: Album[] = [];
  public tracks: Track[] = [];
  public users: User[] = [];
  public favourites: Favourites = {
    artistIds: [],
    trackIds: [],
    albumIds: [],
  };
}
