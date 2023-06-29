import comment from "./comment";

interface post {
  username: string;
  user_id: string;
  user_image: string;
  time: Date;
  community_name: string;
  content: string;
  likes: number;
  dislikes: number;
  comment_id: Array<number>;
  comments: Array<comment>;
  id: number;
}

export default post;
