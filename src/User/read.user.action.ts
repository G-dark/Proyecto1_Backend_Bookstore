import User from "./user.model.js";
import { userType } from "./user.model.js";
import bcrypt from "bcryptjs";
import { PEPPER } from "../App/config.js";

export const thisUserExists = async (email: string): Promise<any> => {
  try {
    const res = await User.find({ email: email, deleted: false });
    if (res.length === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Hubo un error", error);
    return { error: "Error al verificar usuario" };
  }
};

export const getUser = async (email: string) => {
  const query: any = {};
  query.email = email;
  try {
    const user = await User.find(query).exec();
    if (user.length === 0) {
      return { error: "No se encontraron usuarios" };
    }
    return user.map((user)=>{return transform2UserType(user)});
  } catch (error) {
    console.error("Hubo un error", error);
    return { error: "Error al obtener usuario" };
  }
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

const loginUser = async (email: string, password: string):Promise<any> => {
  const query: any = {};
  query.email = email;
  try {
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
  } catch (error) {
    console.error("Hubo un error", error);
    return { error: "Error al obtener los usuarios" };
  }
};

export default loginUser;
