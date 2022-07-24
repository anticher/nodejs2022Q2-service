import AlbumEntity from 'src/albums/entities/album.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('artist')
class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  public name: string;

  @Column('boolean')
  public grammy: boolean;

  @OneToMany(() => AlbumEntity, (album: AlbumEntity) => album.artistId)
  public album: AlbumEntity;
}

export default ArtistEntity;
