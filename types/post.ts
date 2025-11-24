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

export interface CreatePostVars {
  title: string;
  content: string;
  author: string;
}

export interface CreatePostData {
  createPost: Post;
}

export interface UpdatePostVars {
  id: string;
  title?: string;
  content?: string;
}

export interface UpdatePostData {
  updatePost: Post;
}

export interface DeletePostVars {
  id: string;
}

export interface DeletePostData {
  deletePost: boolean;
}
