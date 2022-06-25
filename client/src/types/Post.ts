export interface IPostFormData {
  creator: string;
  title: string;
  message: string;
  tags: string;
  selected_file: string;
}

export interface IPost {
  _id: string;
  title: string;
  message: string;
  creator: string;
  tags: string[];
  selected_file: string;
  like_count: number;
  created_at: string;
}
