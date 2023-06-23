import comment from "./comment";

interface post {
  username: string;
  time: Date;
  community_name: string;
  content: string;
  likes: number;
  comments: Array<comment>;
}

export default post;
