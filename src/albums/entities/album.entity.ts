import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public year: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  public artist: ArtistEntity;
  @Column({ nullable: true })
  public artistId: string;

  @OneToMany(() => TrackEntity, (track) => track.albumId)
  tracks: TrackEntity[];
}
