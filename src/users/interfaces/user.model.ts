import { ApiProperty } from '@nestjs/swagger';

export interface User {
  id?: string;
  login: string;
  password: string;
  version?: number;
  createdAt?: number;
  updatedAt?: number;
}

export class UserResponse {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  version?: number;

  @ApiProperty()
  createdAt?: number;

  @ApiProperty()
  updatedAt?: number;
}
