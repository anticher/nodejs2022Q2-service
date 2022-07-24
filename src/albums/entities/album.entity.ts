import ArtistEntity from 'src/artists/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('album')
class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  public name: string;

  @Column('int')
  public year: number;

  @ManyToOne(() => ArtistEntity)
  @Column({ type: 'uuid', nullable: true })
  public artistId: string | null;
}

export default AlbumEntity;
