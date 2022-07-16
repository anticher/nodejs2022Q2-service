export interface Album {
  id?: string;
  name: string;
  year: number;
  artistId: string | null;
}

export interface AlbumResponse {
  id?: string;
  name: string;
  year: number;
  artistId: string | null;
}
