import { userType } from "./user.model.js";
import createUser from "./create.user.action.js";
import deleteUser from "./delete.user.action.js";
import updateUser from "./update.user.action.js";
import loginUser, { thisUserExists } from "./read.user.action.js";

const registerUser = async (user: userType) => {
  try {
    if (!(await thisUserExists(user.email))) {
      return await createUser(user);
    } else {
      return { error: "Ese usuario ya existe" };
    }
  } catch (error) {
    console.error("Hubo un error", error);
    return { error: "Error al registrar usuario" };
  }
};

const deleteAUser = async (email: string) => {
  try {
    if (await thisUserExists(email)) {
      return await deleteUser(email);
    } else {
      return { error: "usuario inexistente" };
    }
  } catch (error) {
    console.error("Hubo un error", error);
    return { error: "Error al eliminar usuario" };
  }
};

const updateAUser = async (email: string, user: userType) => {
  try {
    if (await thisUserExists(email)) {
      return await updateUser(email, user);
    } else {
      return { error: "usuario inexistente" };
    }
  } catch (error) {
    console.error("hubo un error", error);
    return { error: "Error al actualizar usuario" };
  }
};

const login = async (email: string, password: string) => {
  try {
    if (await thisUserExists(email)) {
      return await loginUser(email, password);
    } else {
      return { error: "usuario inexistente" };
    }
  } catch (error) {
    console.error("Hubo un error", error);
    return { error: "Error al obtener los usuarios" };
  }
};

export { login, updateAUser, deleteAUser, registerUser };
