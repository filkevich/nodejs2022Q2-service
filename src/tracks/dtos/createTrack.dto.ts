import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export default class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  artistId: string | null;

  @IsString()
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
