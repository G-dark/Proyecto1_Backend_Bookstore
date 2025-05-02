import { bookType } from "./book.model.js";
import { createBook } from "./create.book.action.js";
import { deleteBook } from "./delete.book.action.js";
import getBooks, {
  thisBookExists,
  thisBookExistsByID,
} from "./read.book.action.js";
import { updateBook } from "./update.book.action.js";

const registerBook = async (book: bookType) => {
  if (!(await thisBookExists(book.title, book.author))) {
    return await createBook(book);
  } else {
    return { error: "Ese libro ya existe" };
  }
};

const deleteABook = async (id: string) => {
  if (await thisBookExistsByID(id)) {
    return await deleteBook(id);
  } else {
    return { error: "Libro inexistente" };
  }
};

const updateABook = async (book: bookType, id: string) => {
  if (await thisBookExistsByID(id)) {
    return await updateBook(id, book);
  } else {
    return { error: "Libro inexistente" };
  }
};

const getAllBooks = async (
  id?: string,
  genre?: string,
  pusblishDate?: Date,
  editorial?: string,
  author?: string,
  title?: string,
  disponibilidad?: boolean
) => {
  const query: any = {};

  if (id) {
    query._id = id;
  }
  if (genre) {
    query.genre = genre;
  }
  if (pusblishDate) {
    query.publishDate = pusblishDate;
  }
  if (editorial) {
    query.editorial = editorial;
  }
  if (author) {
    query.author = author;
  }
  if (disponibilidad) {
    query.availableAmount = { $gt: 0 };
  } else {
    if (disponibilidad !== undefined) {
      query.availableAmount = { $eq: 0 };
    }
  }
  if (title) {
    query.title = title;
  }
  query.deleted = false;

  return await getBooks(query);
};

export { getAllBooks, updateABook, deleteABook, registerBook };
