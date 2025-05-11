import User from "./user.model.js";
import { userType } from "./user.model.js";
import bcrypt from "bcryptjs";
import { SALT_OR_ROUNDS, PEPPER } from "../App/config.js";

const createUser = async (user: userType) => {
  try {
    const userWithPepper = user.password + PEPPER;
    user.password = await bcrypt.hash(userWithPepper, SALT_OR_ROUNDS);
    const result = await User.find({ email: user.email });
    if (result.length == 0) {
      const newUser = new User(user);
      const created = await newUser.save();
      if (created) {
        return { success: "Usuario registrado" };
      } else {
        return { error: "Usuario no registrado" };
      }
    } else {
      const result2 = await User.updateOne(
        { email: user.email },
        { deleted: false, deleteAt: null }
      );
      if (result2.modifiedCount != 0) {
        return { success: "Usuario registrado" };
      } else {
        return { error: "Usuario no registrado" };
      }
    }
  } catch (error) {
    console.error("Hubo un error", error);
    return { error: "Error al registrar usuario" };
  }
};

export default createUser;
