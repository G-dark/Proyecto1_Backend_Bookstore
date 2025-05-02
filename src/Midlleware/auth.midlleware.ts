import { token } from "../User/user.route.js";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../App/config.js";

export interface AuthRequest extends Request {
  user?: { email: string; rol: string; permissions: string[] };
}
export const Auth:any = ()=> {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const token_acc = token;

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
}
