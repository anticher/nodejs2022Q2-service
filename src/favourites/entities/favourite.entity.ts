import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favouriteArtist')
export class FavouriteArtistsEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  public artist: ArtistEntity;
  @Column({ nullable: true })
  public artistId: string;
}

@Entity('favouriteAlbum')
export class FavouriteAlbumsEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => AlbumEntity, (album) => album.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  public album: AlbumEntity;
  @Column({ nullable: true })
  public albumId: string;
}

@Entity('favouriteTrack')
export class FavouriteTracksEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => TrackEntity, (track) => track.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  public track: TrackEntity;
  @Column({ nullable: true })
  public trackId: string;
}
