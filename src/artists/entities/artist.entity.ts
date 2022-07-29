import { AlbumEntity } from 'src/albums/entities/album.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.artistId)
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.artistId)
  tracks: TrackEntity[];
}
