import { IsBoolean, IsString } from 'class-validator';

export default class UpdateArtistDto {
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
