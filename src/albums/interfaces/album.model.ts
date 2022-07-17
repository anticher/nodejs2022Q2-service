import { ApiProperty } from '@nestjs/swagger';

export interface Album {
  id?: string;
  name: string;
  year: number;
  artistId: string | null;
}

export class AlbumResponse {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  artistId: string | null;
}
