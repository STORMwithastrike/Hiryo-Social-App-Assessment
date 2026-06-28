export interface Post {
  //outlines the bp for the varaibles a post should have
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export interface Comment {
  //outlines the bp for the varaibles a comment should have
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
}

export interface User {
  //outlines the bp for the varaibles a user should have
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
