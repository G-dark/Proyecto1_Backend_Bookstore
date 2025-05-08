import { tokens } from "../User/user.route.js";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../App/config.js";

export interface AuthRequest extends Request {
  user?: { email: string; rol: string; permissions: string[] };
}
export const Auth: any = () => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    let ip;
    if (Array.isArray(clientIp)) {
      ip = clientIp[0];
    } else {
      ip = clientIp || "127.0.0.1";
    }
    let token_acc;

    const authHeader = req.headers["authorization"];

    if (authHeader) {
      token_acc = authHeader.split(" ")[1];
    } else {
      if (tokens.length <= 1 && tokens.length > 0) {
        token_acc = tokens[0].token;
      } else {
        token_acc = tokens
          .filter((item) => {
            return item.Ip == ip;
          })
          .sort((item1, item2) => {
            return item2.entryDate - item1.entryDate;
          })[0].token;
      }
    }

    if (!token_acc) {
      return res.status(404).json({ failed: "token no suministrado" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token_acc, JWT_SECRET as string) as {
        email: string;
        rol: string;
        permissions: string[];
      };
      if (decoded) {
        req.user = decoded;
        next();
      }
    } catch (error) {
      console.error("Ha ocurrido un error", error);
      return res.json({ failed: "token invalido o expirado" });
    }
  };
};
