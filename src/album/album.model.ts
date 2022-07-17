export type TAlbumId = string;

export interface IAlbum {
  id: TAlbumId;
  name: string;
  year: number;
  artistId: string | null;
}
