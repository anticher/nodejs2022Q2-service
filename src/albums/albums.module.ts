import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IMDBService } from 'src/db/in-memory-db.service';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { AlbumEntity } from './entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  controllers: [AlbumsController],
  providers: [AlbumsService, IMDBService],
  exports: [TypeOrmModule],
})
export class AlbumsModule {}
