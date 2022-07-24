import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create.dto';
import { UpdateAlbumDto } from './dto/update.dto';
import { Album } from './models/album.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import AlbumEntity from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumsRepository: Repository<AlbumEntity>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = this.albumsRepository.create(createAlbumDto);
    await this.albumsRepository.save(newAlbum);
    return await this.getAlbum(newAlbum.id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.getAlbumFromDB(id);
    if (!album) {
      throw new HttpException('album does not exist', HttpStatus.NOT_FOUND);
    }
    for (const [key, value] of Object.entries(updateAlbumDto)) {
      if (value !== undefined) {
        album[key] = value;
      }
    }
    await this.albumsRepository.update(album.id, album);
    return await this.getAlbumFromDB(id);
  }

  async delete(id: string): Promise<void> {
    const album = await this.getAlbumFromDB(id);
    if (!album) {
      throw new HttpException('album does not exist', HttpStatus.NOT_FOUND);
    }
    //   this.db.favourites.albumIds = this.db.favourites.albumIds.filter(
    //     (element) => element !== id,
    //   );
    //   this.db.tracks.forEach((track) => {
    //     if (track.albumId === id) {
    //       track.albumId = null;
    //     }
    //   });
    await this.albumsRepository.delete(album.id);
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }

  async getAlbumFromDB(id: string): Promise<AlbumEntity> {
    const album = await this.albumsRepository.findOneBy({
      id: id,
    });
    return album;
  }

  async getAlbum(id: string): Promise<Album> {
    const album = await this.getAlbumFromDB(id);
    if (!album) {
      throw new HttpException('album does not exist', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  async getAll(): Promise<Album[]> {
    return await this.albumsRepository.find();
  }
}
