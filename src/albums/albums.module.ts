import { Module } from '@nestjs/common';
import { IMDBService } from 'src/db/in-memory-db.service';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, IMDBService],
})
export class AlbumsModule {}
