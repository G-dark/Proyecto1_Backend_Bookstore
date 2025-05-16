import Book from "./book.model.js";
import { bookType } from "./book.model.js";

export const deleteBook = async (id: string) => {
  const res = await Book.updateOne(
    { _id: id },
    { deleted: true, deleteAt: new Date() }
  );
  if (res.modifiedCount === 0) {
    return { error: "No se pudo eliminar el libro" };
  }
  return { success: "Libro eliminado" };
};
