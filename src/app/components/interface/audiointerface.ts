export interface audio {
  id: number;
  title: string;
  description: string;
  transcription: string;
  url: string;
  uploadedAt: string;
  category: string;
  tags: Tag[];
}

interface Tag {
  id: number;
  title: string;
}
