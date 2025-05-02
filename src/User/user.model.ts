import mongoose from "mongoose";

const reserveHistorySchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  reserveDate: { type: Date },
  returnDate: { type: Date },
});

export type userType = {
    name: string;
    email: string;
    password: string;
    rol: 'user'|'admin';
    permissions: string[];
    deleteAt?: Date;
    deleted?: boolean;
    image?: string;
    phone: string;
    address: string;
    userHistory?: JSON[];
  };

const userSchema = new mongoose.Schema<userType>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ["admin", "user"], default: "user" },
    permissions: { type: [String], default: [] },
    deleteAt: { type: Date, default: null },
    deleted: { type: Boolean, default: false },
    image: { type: String, default: null },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    userHistory: [reserveHistorySchema],
  },
  { timestamps: true }
);



const User = mongoose.model("User", userSchema);

export default User;
