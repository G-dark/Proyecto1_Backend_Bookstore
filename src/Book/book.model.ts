import mongoose from "mongoose";

const reserveHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required:true },
  reserveDate: { type: Date, default: Date.now },
  returnDate: { type: Date, default: Date.now },
});
export type bookType = {
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
  reserveHistory: JSON[];
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
    reserveHistory: [reserveHistorySchema],
  },
  { timestamps: true }
);
const Book = mongoose.model("Book", bookSchema);

export default Book;
