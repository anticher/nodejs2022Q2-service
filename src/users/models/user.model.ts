import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  version?: number;

  @ApiProperty()
  createdAt?: number;

  @ApiProperty()
  updatedAt?: number;
}
