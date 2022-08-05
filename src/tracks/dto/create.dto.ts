import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  duration: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  artistId: string | null;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  albumId: string | null;
}
