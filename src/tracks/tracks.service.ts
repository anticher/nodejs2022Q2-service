import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create.dto';
import { Track, TrackResponse } from './interfaces/track.model';
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { UpdateTrackDto } from './dto/update.dto';
import { IMDBService } from 'src/db/in-memory-db.service';

@Injectable()
export class TracksService {
  private list: Track[] = [];

  constructor(private db: IMDBService) {
    this.list = db.tracks;
  }

  create(createTrackDto: CreateTrackDto): any {
    const track: Track = createTrackDto;
    track.id = uuidv4();
    this.list.push(track);
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): any {
    const track = this.list.find((item) => item.id === id);
    if (!track) {
      throw new HttpException('track does not exist', HttpStatus.NOT_FOUND);
    }
    track.name = updateTrackDto.name ? updateTrackDto.name : track.name;
    track.duration = updateTrackDto.duration
      ? updateTrackDto.duration
      : track.duration;
    track.artistId = updateTrackDto.artistId
      ? updateTrackDto.artistId
      : track.artistId;
    track.albumId = updateTrackDto.albumId
      ? updateTrackDto.albumId
      : track.albumId;
    return track;
  }

  delete(id: string): void {
    const itemIndex = this.list.findIndex((item) => item.id === id);
    if (itemIndex < 0) {
      throw new HttpException('track does not exist', HttpStatus.NOT_FOUND);
    }
    const itemInFavorouritesId = this.db.favourites.trackIds.findIndex(
      (item) => item === id,
    );
    if (itemInFavorouritesId >= 0) {
      this.db.favourites.trackIds.splice(itemInFavorouritesId, 1);
    }
    this.list.splice(itemIndex, 1);
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }

  getTrack(id: string): TrackResponse {
    const track = this.list.find((item) => item.id === id);
    if (!track) {
      throw new HttpException('track does not exist', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  getAll(): TrackResponse[] {
    return this.list;
  }
}
