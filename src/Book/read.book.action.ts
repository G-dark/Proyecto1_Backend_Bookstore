import Book from "./book.model.js";
import { bookType } from "./book.model.js";

export const thisBookExistsByID = async (id: string) => {
  try {
    const res = await Book.find({ _id: id, deleted: false });
    if (res.length === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Hubo un error", error);
    return { error: "Error al verificar el libro" };
  }
};
export const thisBookExists = async (title: string, author: string) => {
  try {
    const res = await Book.find({
      title: title,
      author: author,
      deleted: false,
    });
    if (res.length === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Hubo un error", error);
    return { error: "Error al verificar el libro" };
  }
};

const getBooks = async (query: any) => {
  try {
    const books = await Book.find(query).exec();
    if (books.length === 0) {
      return { error: "No se encontraron libros" };
    }
    return books.map((book)=>{return transform2BookType(book)});
  } catch (error) {
    console.error("Hubo un error", error);
    return { error: "Error al obtener los libros" };
  }
};
export default getBooks;

const transform2BookType = (book:any):bookType => {
  return {
    id:book._id,
    publishDate:book.publishDate,
    description:book.description,
    title:book.title,
    author:book.author,
    genre:book.genre,
    editorial:book.editorial,
    amount:book.amount,
    availableAmount:book.availableAmount,
    reserveHistory:book.reserveHistory,
  }
}
