import Book from "./book.model.js";
import { bookType } from "./book.model.js";

export const createBook = async (book: bookType) => {
  const newBook = new Book(book);
  const created = await newBook.save();
  if (created) {
    return { success: "Libro creado" };
  } else {
     return { error: "Libro no creado" };
  }
};
