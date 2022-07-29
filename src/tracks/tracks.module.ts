import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IMDBService } from 'src/db/in-memory-db.service';
import { TrackEntity } from './entities/track.entity';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity])],
  controllers: [TracksController],
  providers: [TracksService, IMDBService],
  exports: [TypeOrmModule],
})
export class TracksModule {}
