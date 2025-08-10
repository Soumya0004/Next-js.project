export interface StartupCardType {
  _createdAt: string;
  views: number;
  author: {
    _id: number | string;
    name: string;
  };
  _id: number | string;
  description: string;
  image: string;
  category: string;
  title: string;
} 