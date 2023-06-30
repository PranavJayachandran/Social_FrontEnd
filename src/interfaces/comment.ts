interface comment {
  id: number;
  comment_content: string;
  upvote: number;
  downvote: number;
  table_name: {
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
