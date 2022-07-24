import AlbumEntity from 'src/albums/entities/album.entity';
import ArtistEntity from 'src/artists/entities/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('track')
class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  public name: string;

  @Column('int')
  public duration: number;

  @ManyToOne(() => ArtistEntity)
  @Column({ type: 'uuid', nullable: true })
  public artistId: string | null;

  @ManyToOne(() => AlbumEntity)
  @Column({ type: 'uuid', nullable: true })
  public albumId: string | null;
}

export default TrackEntity;
