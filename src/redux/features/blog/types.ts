export interface PostResponse {
  title: string;
  content: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
}

export interface Post {
  title: string;
  content: string;
}

export interface InitialState {
  posts: Post[];
  post: Post | null;
}
