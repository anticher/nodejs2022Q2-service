import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create.dto';
import { Artist } from './models/artist.model';
import { UpdateArtistDto } from './dto/update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = this.artistsRepository.create(createArtistDto);
    await this.artistsRepository.save(newArtist);
    return await this.getArtist(newArtist.id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.getArtistFromDB(id);
    if (!artist) {
      throw new HttpException('artist does not exist', HttpStatus.NOT_FOUND);
    }
    for (const [key, value] of Object.entries(updateArtistDto)) {
      if (value !== undefined) {
        artist[key] = value;
      }
    }
    await this.artistsRepository.update(artist.id, artist);
    return await this.getArtistFromDB(id);
  }

  async delete(id: string): Promise<void> {
    const artist = await this.getArtistFromDB(id);
    if (!artist) {
      throw new HttpException('artist does not exist', HttpStatus.NOT_FOUND);
    }
    await this.artistsRepository.delete(artist.id);
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }

  async getArtistFromDB(id: string): Promise<ArtistEntity> {
    const artist = await this.artistsRepository.findOneBy({
      id: id,
    });
    return artist;
  }

  async getArtist(id: string): Promise<Artist> {
    const artist = await this.getArtistFromDB(id);
    if (!artist) {
      throw new HttpException('artist does not exist', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  async getAll(): Promise<Artist[]> {
    return await this.artistsRepository.find();
  }
}
