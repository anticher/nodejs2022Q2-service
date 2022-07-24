import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artist')
class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  public name: string;

  @Column('boolean')
  public grammy: boolean;
}

export default ArtistEntity;
