export interface Book {
  key?: string;
  id: string;
  authors: string[];
  description: string[];
  publishedDate: string[];
  thumbnail: string[];
  title: string[];
  rate?: number;
  review?: string;
}
