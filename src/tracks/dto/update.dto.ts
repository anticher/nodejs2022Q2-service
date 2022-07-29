import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTrackDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  artistId: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  albumId: string | null;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  duration: number;
}
