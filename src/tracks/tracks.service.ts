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

  create(createTrackDto: CreateTrackDto): TrackResponse {
    const track: Track = createTrackDto;
    track.id = uuidv4();
    this.list.push(track);
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): TrackResponse {
    const track = this.list.find((item) => item.id === id);
    if (!track) {
      throw new HttpException('track does not exist', HttpStatus.NOT_FOUND);
    }
    for (const [key, value] of Object.entries(updateTrackDto)) {
      if (value !== undefined) {
        track[key] = value;
      }
    }
    return track;
  }

  delete(id: string): void {
    const itemIndex = this.list.findIndex((item) => item.id === id);
    if (itemIndex < 0) {
      throw new HttpException('track does not exist', HttpStatus.NOT_FOUND);
    }
    this.db.favourites.trackIds = this.db.favourites.trackIds.filter(
      (element) => element !== id,
    );
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
