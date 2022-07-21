import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export default class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  year: number;

  @IsUUID()
  @IsOptional()
  artistId: string | null;
}
