import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export default class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  artistId: string | null;

  @IsOptional()
  @IsString()
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
