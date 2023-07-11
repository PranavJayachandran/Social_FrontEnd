interface event {
  name: string;
  interested: number;
  going: number;
  date: Date;
  community: {
    name: string;
  };
  id: number;
  cover_image: string;
  description: string;
}

export default event;
