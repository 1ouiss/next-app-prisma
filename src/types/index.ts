export interface IPost {
  id?: number;
  title: string;
  content: string;
  category?: ICategory;
  categoryId?: number;
}

export interface ICategory {
  id?: number;
  name: string;
  posts?: IPost[];
}
