import bcrypt from "bcryptjs";
import User from "./user.model.js";
import { userType } from "./user.model.js";
import { SALT_OR_ROUNDS, PEPPER } from "../App/config.js";



const updateUser = async (email:string, user: userType) => {
  try {
    if(user.password){
      user.password = await bcrypt.hash(user.password + PEPPER, SALT_OR_ROUNDS);
    }
    const res = await User.updateOne({ email: email, deleted: false }, user);
    if (res.modifiedCount === 0) {
      return { error: "No se pudo actualizar usuario" };
    }
    return { success: "Usuario actualizado" };
  } catch (error) {
    console.error("hubo un error", error);
    return { error: "Error al actualizar usuario" };
  }
};
export default updateUser;
