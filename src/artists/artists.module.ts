import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IMDBService } from 'src/db/in-memory-db.service';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { ArtistEntity } from './entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  controllers: [ArtistsController],
  providers: [ArtistsService, IMDBService],
  exports: [TypeOrmModule],
})
export class ArtistsModule {}
