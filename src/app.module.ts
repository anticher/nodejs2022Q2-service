import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { IMDBService } from './db/in-memory-db.service';

@Module({
  imports: [UsersModule, ArtistsModule, AlbumsModule, TracksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
