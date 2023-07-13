interface comment {
  id: number;
  comment_content: string;
  upvote: number;
  downvote: number;
  users: {
    name: string;
    user_image: string;
  };
  upvotes_downvotes: [
    {
      user_id: number;
      value: number;
      id: number;
    }
  ];
}
export default comment;
