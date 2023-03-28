import { Genre } from "@framework/genres";

export interface Artist {
  id: number;
  name: string;
  image: string;
  popularity: number;
  genres: (Genre & { is_primary: 0 | 1 })[];
}
