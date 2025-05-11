import mongoose from "mongoose";

export type reserveType = {
  id?:string;
  user: string;
  reserveDate: Date;
  maxTime2return: number;
  returnDate?: Date;
};
export type bookType = {
  id?:string;
  publishDate: Date;
  title: string;
  author: string;
  genre: string;
  editorial: string;
  amount: number;
  availableAmount: number;
  description: string;
  image?: string;
  deleteAt?: Date;
  deleted?: boolean;
  reserveHistory: reserveType[];
};
const bookSchema = new mongoose.Schema<bookType>(
  {
    publishDate: { type: Date, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    editorial: { type: String, required: true },
    amount: { type: Number, required: true },
    availableAmount: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    deleteAt: { type: Date, default: null },
    deleted: { type: Boolean, default: false },
    reserveHistory: [
      {
        user: { type: String, ref: "User", required: true },
        maxTime2return: { type: Number, default: 15 },
        reserveDate: { type: Date, required: true },
        returnDate: { type: Date, default:null },
      },
    ],
  },
  { timestamps: true }
);
const Book = mongoose.model("Book", bookSchema);

export default Book;
