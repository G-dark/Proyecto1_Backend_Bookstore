import { Router, Request, Response } from "express";
import {
  getAllBooks,
  registerBook,
  updateABook,
  deleteABook,
  reserveBook,
  returnBook,
} from "./book.controller.js";
import { AuthRequest, Auth } from "../Midllewares/auth.midlleware.js";
import { bookType } from "./book.model.js";
const books = Router();

const getBookByID: any = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getAllBooks(id);

  return "error" in result
    ? res.status(444).json(result)
    : res.json(result);
};

const getBooksByAmount: any = async (req: Request, res: Response) => {
  const { genero, fechaPublicacion, editorial, autor, nombre, disponibilidad } =
    req.query;

  const result = await getAllBooks(
    undefined,
    (genero as string) || undefined,
    fechaPublicacion ? new Date(fechaPublicacion as string) : undefined,
    (editorial as string) || undefined,
    (autor as string) || undefined,
    (nombre as string) || undefined,
    (disponibilidad as string) == "true" ||
      (disponibilidad as string) == "" ||
      undefined
  );
  return "error" in result
    ? res.status(444).json(result)
    : res.json(result);
};

const makeABook: any = async (req: AuthRequest, res: Response) => {
  const {
    publishDate,
    title,
    author,
    genre,
    editorial,
    amount,
    availableAmount,
    description,
    image,
  } = req.body;

  const book: bookType = {
    publishDate,
    title,
    author,
    genre,
    editorial,
    amount,
    availableAmount,
    description,
    image,
    reserveHistory: [],
  };

  let result;
  if (req.user) {
    if (
      req.user.rol !== "admin" ||
      (req.user.rol == "admin" &&
        req.user.permissions.every((perm) => {
          return perm != "create books";
        }))
    ) {
      return res.status(401).json({ error: "permisos insuficientes" });
    }

    if (
      req.user.rol == "admin" &&
      req.user.permissions.some((perm) => {
        return perm == "create books";
      })
    ) {
      if (
        publishDate &&
        title &&
        author &&
        genre &&
        editorial &&
        amount &&
        availableAmount &&
        description
      ) {
        result = await registerBook(book);
        return result.success ? res.json(result) : res.status(444).json(result);
      } else {
        return res.status(444).json({
          error:
            "Los siguientes campos son requeridos: publishDate, title, author, genre, editorial, amountm availableAnount, description ",
        });
      }
    }
  } else {
    return res.status(401).json({ error: "permisos insuficientes" });
  }
};

const editABook: any = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const {
    publishDate,
    title,
    author,
    genre,
    editorial,
    amount,
    availableAmount,
    description,
    image,
    reserveHistory,
  } = req.body;

  const book: bookType = {
    publishDate,
    title,
    author,
    genre,
    editorial,
    amount,
    availableAmount,
    description,
    image,
    reserveHistory,
  };

  let result;
  if (req.user) {
    if (
      req.user.rol !== "admin" ||
      (req.user.rol == "admin" &&
        req.user.permissions.every((perm) => {
          return perm != "update books";
        }))
    ) {
      return res.status(401).json({ error: "permisos insuficientes" });
    }

    if (
      req.user.rol == "admin" &&
      req.user.permissions.some((perm) => {
        return perm == "update books";
      })
    ) {
      result = await updateABook(book, id);
      return result.success ? res.json(result) : res.status(444).json(result);
    }
  } else {
    return res.status(401).json({ error: "permisos insuficientes" });
  }
};

const killABook: any = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  let result;
  if (req.user) {
    if (
      req.user.rol !== "admin" ||
      (req.user.rol == "admin" &&
        req.user.permissions.every((perm) => {
          return perm != "delete books";
        }))
    ) {
      return res.status(401).json({ error: "permisos insuficientes" });
    }

    if (
      req.user.rol == "admin" &&
      req.user.permissions.some((perm) => {
        return perm == "delete books";
      })
    ) {
      result = await deleteABook(id);
      return result.success ? res.json(result) : res.status(444).json(result);
    }
  } else {
    return res.status(401).json({ error: "permisos insuficientes" });
  }
};

const returnABook: any = async (req: AuthRequest, res: Response) => {
  const { idbook, idreserva } = req.params;

  let result;
  if (req.user) {
    if (
      req.user.permissions.every((perm) => {
        return perm != "reserve/return books";
      })
    ) {
      return res.status(401).json({ error: "permisos insuficientes" });
    }

    if (
      req.user.permissions.some((perm) => {
        return perm == "reserve/return books";
      })
    ) {
      result = await returnBook(idbook, idreserva, req.user.email);
      return result.success ? res.json(result) : res.status(444).json(result);
    }
  } else {
    return res.status(401).json({ error: "permisos insuficientes" });
  }
};

const borrowABook: any = async (req: AuthRequest, res: Response) => {
  const { id, plazo } = req.params;

  let result;
  if (req.user) {
    if (
      req.user.permissions.every((perm) => {
        return perm != "reserve/return books";
      })
    ) {
      return res.status(401).json({ error: "permisos insuficientes" });
    }

    if (
      req.user.permissions.some((perm) => {
        return perm == "reserve/return books";
      })
    ) {
      result = await reserveBook(id, req.user.email, Number(plazo));

      return result.success ? res.json(result) : res.status(444).json(result);
    }
  } else {
    return res.status(401).json({ error: "permisos insuficientes" });
  }
};

books.get("/API/books/:id", getBookByID);
books.get("/API/books", getBooksByAmount);
books.post("/API/books", Auth(), makeABook);
books.patch("/API/books/:id", Auth(), editABook);
books.patch("/API/books/reserve/:id/:plazo", Auth(), borrowABook);
books.patch("/API/books/return/:idbook/:idreserva", Auth(), returnABook);
books.delete("/API/books/:id", Auth(), killABook);

export default books;
