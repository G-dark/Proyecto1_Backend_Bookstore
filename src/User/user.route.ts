//importar librerias
import { Router, Request, Response } from "express";
import {
  login,
  deleteAUser,
  updateAUser,
  registerUser,
} from "./user.controller.js";
import { userType } from "./user.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../App/config.js";
import { Auth, AuthRequest } from "../Midllewares/auth.midlleware.js";

// crear el enrutador
const users = Router();

type sessionType = {
   Ip: string;
   token: string;
   entryDate: number;
}

// inicializa el token en vacio
let tokens: sessionType[] = [];

// declaracion de endpoints
const loginUser: any = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = (await login(email, password))[0] as userType;
  if (user) {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    let ip;

    if (Array.isArray(clientIp)) {
       ip = clientIp[0];
    } else {
      ip = clientIp || "127.0.0.1"
    }

    const token = jwt.sign(
      { email, rol: user.rol, permissions: user.permissions },
      JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    tokens.push({
      Ip: ip,
      entryDate: Date.now(),
      token: token,
    });

    return res.json({user, token});
  } else {
    return res.status(404).json({ error: "usuario no encontrado" });
  }
};

const registerAUser: any = async (req: Request, res: Response) => {
  const { name, email, password, rol, permissions, image, phone, address } =
    req.body;

  const user: userType = {
    name,
    email,
    password,
    rol,
    permissions,
    image,
    phone,
    address,
    userHistory: [],
  };
  const result = await registerUser(user);
  return res.json(result);
};

const editAUser: any = async (req: AuthRequest, res: Response) => {
  const { name, email, password, rol, permissions, image, phone, address } =
    req.body;

  const { emailSearched } = req.params;

  const user: userType = {
    name,
    email,
    password,
    rol,
    permissions,
    image,
    phone,
    address,
    userHistory: [],
  };
  let result;

  if (req.user) {
    const emailAuthed = req.user.email;
    if (
      (req.user.rol == "admin" || req.user.rol == "user") &&
      emailAuthed == emailSearched
    ) {
      result = await updateAUser(emailSearched, user);
      return res.json(result);
    }

    if (
      (req.user.rol !== "admin" && emailAuthed !== emailSearched) ||
      (req.user.rol == "admin" &&
        emailAuthed !== email &&
        req.user.permissions.every((perm) => {
          return perm != "update someoneelse";
        }))
    ) {
      return res.status(401).json({ error: "permisos insuficientes" });
    }

    if (
      req.user.rol == "admin" &&
      emailAuthed !== emailSearched &&
      req.user.permissions.some((perm) => {
        return perm == "update someoneelse";
      })
    ) {
      result = await updateAUser(emailSearched, user);
      return res.json(result);
    }
  } else {
    return res.status(401).json({ error: "permisos insuficientes" });
  }
};

const killAUser: any = async (req: AuthRequest, res: Response) => {
  const { email } = req.params;
  let result;
  if (req.user) {
    const emailAuthed = req.user.email;

    if (
      req.user.rol == "admin" ||
      (req.user.rol == "user" && emailAuthed == email)
    ) {
      result = await deleteAUser(email);
      return res.json(result);
    }

    if (
      (req.user.rol !== "admin" && emailAuthed !== email) ||
      (req.user.rol == "admin" &&
        emailAuthed !== email &&
        req.user.permissions.every((perm) => {
          return perm != "delete someoneelse";
        }))
    ) {
      return res.status(401).json({ error: "permisos insuficientes" });
    }

    if (
      req.user.rol == "admin" &&
      emailAuthed !== email &&
      req.user.permissions.some((perm) => {
        return perm == "delete someoneelse";
      })
    ) {
      result = await deleteAUser(email);
      return res.json(result);
    }
  } else {
    return res.status(401).json({ error: "permisos insuficientes" });
  }
};

users.post("/API/users", loginUser);
users.post("/API/users/create", registerAUser);
users.patch("/API/users/:emailSearched", Auth(), editAUser);
users.delete("/API/users/:email", Auth(), killAUser);
export { tokens };
export default users;
