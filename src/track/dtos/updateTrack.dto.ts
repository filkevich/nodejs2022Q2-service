import { IsNumber, IsOptional, IsString } from 'class-validator';

export default class UpdateTrackDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  artistId: string | null;

  @IsString()
  @IsOptional()
  albumId: string | null;

  @IsNumber()
  @IsOptional()
  duration: number;
}
