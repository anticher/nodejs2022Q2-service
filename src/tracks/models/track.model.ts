import { ApiProperty } from '@nestjs/swagger';

export class Track {
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
