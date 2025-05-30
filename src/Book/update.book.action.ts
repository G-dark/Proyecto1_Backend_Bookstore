import Book from "./book.model.js";
import { bookType } from "./book.model.js";

export const updateBook = async (id: string, book: bookType) => {
  const res = await Book.updateOne({ _id: id, deleted: false }, book);
  if (res.modifiedCount === 0) {
    return { error: "No se pudo actualizar el libro" };
  }
  return { success: "Libro actualizado" };
};
