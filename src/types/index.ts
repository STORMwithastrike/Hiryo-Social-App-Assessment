export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export interface Comment {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

// React Navigation Types
export type RootStackParamList = {
  Home: undefined;
  PostDetails: { post: Post };
};
