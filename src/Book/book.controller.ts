import { getUser } from "../User/read.user.action.js";
import updateUser from "../User/update.user.action.js";
import { updateAUser } from "../User/user.controller.js";
import { userType } from "../User/user.model.js";
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

const reserveBook = async (id: string, email: string, plazo: number) => {
  if (await thisBookExistsByID(id)) {
    try {
      const query: any = {};
      query._id = id;
      const book2Updated = await getBooks(query);
      const user2Reserve = await getUser(email);
      const book = (book2Updated as bookType[])[0];
      const user = (user2Reserve as userType[])[0];
      const now = Date.now();
      --book.availableAmount;
      book.reserveHistory.push({
        user: user.email,
        reserveDate: new Date(now),
        maxTime2return: plazo,
      });
      const message = await updateBook(id, book);
      const bookUpdated = await getBooks(query);
      const book2 = (book2Updated as bookType[])[0];
      user.userHistory!.push({
        book: book.id!,
        reserveDate: new Date(now),
        reserveID: book2.reserveHistory.find((reserve) => {
          return (
            reserve.user == email &&
            new Date(reserve.reserveDate).getTime() == new Date(now).getTime()
          );
        })!.id,
      });

      const message2 = await updateUser(email, user);

      return message.success && message2.success
        ? { success: "Libro reservado" }
        : { error: "Libro no reservado" };
    } catch (error) {
      console.error("Error obtenido", error);
      return { error: "Error en la reserva" };
    }
  } else {
    return { error: "Libro inexistente" };
  }
};

const returnBook = async (id: string, reserveid: string, email: string) => {
  if (await thisBookExistsByID(id)) {
    const query: any = {};
    query._id = id;
    const book2Updated = await getBooks(query);
    const user2Reserve = await getUser(email);
    const book = (book2Updated as bookType[])[0];
    const user = (user2Reserve as userType[])[0];
    ++book.availableAmount;
    const now = Date.now();
    const userHistoryIndex = user.userHistory!.findIndex((history) => {
      return history.reserveID == reserveid && history.book == id;
    });
    
    if (
      user.userHistory![userHistoryIndex] &&
      user.userHistory![userHistoryIndex].returnDate == null
    ) {
      user.userHistory![userHistoryIndex].returnDate = new Date(now);
      const fecha1 = new Date(user.userHistory![userHistoryIndex].reserveDate);
      const fecha2 = new Date(user.userHistory![userHistoryIndex].reserveDate);

      const diferenciaMs = Math.abs(fecha1.getTime() - fecha2.getTime());

      // Convertir milisegundos a días
      const diferenciaDias = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));

      const bookReserveIndex = book.reserveHistory.findIndex((reserve) => {
        return reserve.user == email && reserve.id == reserveid;
      });
      const plazo = book.reserveHistory[bookReserveIndex].maxTime2return;
      user.userHistory![userHistoryIndex].returnOutOfDate =
        diferenciaDias > plazo ? diferenciaDias : 0;

      book.reserveHistory[bookReserveIndex].returnDate = new Date(now);

      const message2 = await updateUser(email, user);
      const message = await updateBook(id, book);

      return message.success && message2.success
        ? { success: "Libro retornado" }
        : { error: "Libro no retornado" };
    } else {
      return { error: "libro ya retornado o reserva inexistente" };
    }
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

export {
  getAllBooks,
  updateABook,
  deleteABook,
  registerBook,
  reserveBook,
  returnBook,
};
