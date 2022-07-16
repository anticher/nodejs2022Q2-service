import { Injectable } from '@nestjs/common';
import { Artist } from 'src/artists/interfaces/artist.model';
import { Album } from 'src/albums/interfaces/album.model';
import { Track } from 'src/tracks/interfaces/track.model';
import { User } from 'src/users/interfaces/user.model';

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
}
