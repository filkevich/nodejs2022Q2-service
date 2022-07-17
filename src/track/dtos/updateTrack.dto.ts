import { IsNumber, IsString } from 'class-validator';

export default class UpdateTrackDto {
  @IsString()
  name: string;

  @IsString()
  artistId: string | null;

  @IsString()
  albumId: string | null;

  @IsNumber()
  duration: number;
}
