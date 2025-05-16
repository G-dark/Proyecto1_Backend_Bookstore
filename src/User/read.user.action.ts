import User from "./user.model.js";
import { userType } from "./user.model.js";
import bcrypt from "bcryptjs";
import { PEPPER } from "../App/config.js";

export const thisUserExists = async (email: string): Promise<any> => {
  const res = await User.find({ email: email, deleted: false });
  if (res.length === 0) {
    return false;
  }
  return true;
};

export const getUser = async (email: string) => {
  const query: any = {};
  query.email = email;
  const user = await User.find(query).exec();

  if (user.length === 0) {
    return { error: "No se encontraron usuarios" };
  }
  return user;
};

const transform2UserType = (user: any): userType => {
  return {
    name: user.name,
    email: user.email,
    password: user.password,
    rol: user.rol,
    permissions: user.permissions,
    phone: user.phone,
    userHistory: user.userHistory,
    address: user.address,
  };
};

const loginUser = async (email: string, password: string): Promise<any> => {
  const query: any = {};
  query.email = email;

  const user = await User.find(query).exec();
  if (user.length === 0) {
    return { error: "No se encontraron usuarios" };
  }
  const isMatch = await bcrypt.compare(password + PEPPER, user[0].password);

  if (isMatch) {
    return user;
  } else {
    return { error: "Contraseña incorrecta" };
  }
};

export default loginUser;
