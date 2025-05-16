import Book from "./book.model.js";
import { bookType } from "./book.model.js";

export const thisBookExistsByID = async (id: string) => {
  const res = await Book.find({ _id: id, deleted: false });
  if (res.length === 0) {
    return false;
  }
  return true;
};
export const thisBookExists = async (title: string, author: string) => {
  const res = await Book.find({
    title: title,
    author: author,
    deleted: false,
  });
  if (res.length === 0) {
    return false;
  }
  return true;
};

const getBooks = async (query: any) => {
  const books = await Book.find(query).exec();
  if (books.length === 0) {
    return { error: "No se encontraron libros" };
  }
  return books.map((book) => {
    return transform2BookType(book);
  });
};
export default getBooks;

const transform2BookType = (book: any): bookType => {
  return {
    id: book._id,
    publishDate: book.publishDate,
    description: book.description,
    title: book.title,
    author: book.author,
    genre: book.genre,
    editorial: book.editorial,
    amount: book.amount,
    availableAmount: book.availableAmount,
    reserveHistory: book.reserveHistory,
  };
};
