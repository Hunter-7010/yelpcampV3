export type CampTypes = {
  _id: string;
  id: string;
  name: string;
  address: string;
  price: number;
  review: number;
  image: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
  updatedAt?: Date;
};


export type ReviewsTypes = {
  id: string;
  comment: string;
  campId: string;
  userId: string;
  username: string;
};
