import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create.dto';
import { Track } from './models/track.model';
import { UpdateTrackDto } from './dto/update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private tracksRepository: Repository<TrackEntity>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack = this.tracksRepository.create(createTrackDto);
    await this.tracksRepository.save(newTrack);
    return await this.getTrack(newTrack.id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.getTrackFromDB(id);
    if (!track) {
      throw new HttpException('track does not exist', HttpStatus.NOT_FOUND);
    }
    for (const [key, value] of Object.entries(updateTrackDto)) {
      if (value !== undefined) {
        track[key] = value;
      }
    }
    await this.tracksRepository.update(track.id, track);
    return await this.getTrackFromDB(id);
  }

  async delete(id: string): Promise<void> {
    const track = await this.getTrackFromDB(id);
    if (!track) {
      throw new HttpException('track does not exist', HttpStatus.NOT_FOUND);
    }
    await this.tracksRepository.delete(track.id);
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }

  async getTrackFromDB(id: string): Promise<Track> {
    const track = await this.tracksRepository.findOneBy({
      id: id,
    });
    return track;
  }

  async getTrack(id: string): Promise<Track> {
    const track = await this.getTrackFromDB(id);
    if (!track) {
      throw new HttpException('track does not exist', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  async getAll(): Promise<Track[]> {
    return await this.tracksRepository.find();
  }
}
