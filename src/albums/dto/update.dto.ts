import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAlbumDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  year: number;

  @ApiPropertyOptional()
  @IsOptional()
  artistId: string | null;
}
