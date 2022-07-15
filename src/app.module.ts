import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';

@Module({
  imports: [UsersModule, ArtistsModule, AlbumsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
