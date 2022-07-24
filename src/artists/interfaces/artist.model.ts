import { ApiProperty } from '@nestjs/swagger';

export interface Artist {
  id?: string;
  name: string;
  grammy: boolean;
}

export class ArtistResponse {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  grammy: boolean;
}
