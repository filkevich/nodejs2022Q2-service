import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export default class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsOptional()
  artistId: string | null;
}
