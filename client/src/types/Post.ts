export interface IPostFormData {
  creator: string;
  title: string;
  message: string;
  tags: string[];
  selected_file: string;
}

export interface IPost {
  _id: string;
  title: string;
  message: string;
  creator: string;
  tags: string[];
  selected_file: string;
  likes: string[];
  created_at: string;
}
