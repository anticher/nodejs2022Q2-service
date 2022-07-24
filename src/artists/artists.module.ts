import { Module } from '@nestjs/common';
import { IMDBService } from 'src/db/in-memory-db.service';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, IMDBService],
})
export class ArtistsModule {}
