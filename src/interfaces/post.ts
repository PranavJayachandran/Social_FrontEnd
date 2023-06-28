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
  comments: Array<comment>;
}

export default post;
