export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PostListItem {
  id: string;
  title: string;
  author: string;
  createdAt: string;
}

export interface GetPostsData {
  posts: PostListItem[];
}

export interface GetPostData {
  post: Post;
}

export interface GetPostVars {
  id: string;
}
