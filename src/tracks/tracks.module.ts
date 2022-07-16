import { Module } from '@nestjs/common';
import { IMDBService } from 'src/db/in-memory-db.service';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, IMDBService],
})
export class TracksModule {}
