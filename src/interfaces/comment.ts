interface comment {
  id: number;
  comment_content: string;
  upvotes: number;
  downvotes: number;
  table_name: {
    name: string;
    user_image: string;
  };
  upvotes_downvotes: [
    {
      comment_id: number;
      value: number;
      id: number;
    }
  ];
}
export default comment;
