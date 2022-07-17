import { ApiProperty } from '@nestjs/swagger';

export interface Track {
  id?: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export class TrackResponse {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  albumId: string | null;

  @ApiProperty()
  artistId: string | null;
}
