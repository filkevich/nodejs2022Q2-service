export type TTrackId = string;

export interface ITrack {
  id: TTrackId;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}
