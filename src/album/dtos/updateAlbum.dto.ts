import { IsNumber, IsString } from 'class-validator';

export default class UpdateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  artistId: string | null;
}
