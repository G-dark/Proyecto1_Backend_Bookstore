import { userType } from "./user.model.js";
import createUser from "./create.user.action.js";
import deleteUser from "./delete.user.action.js";
import updateUser from "./update.user.action.js";
import loginUser, { thisUserExists } from "./read.user.action.js";

const registerUser = async (user: userType) => {
  if (!(await thisUserExists(user.email))) {
    return await createUser(user);
  } else {
    return { error: "Ese usuario ya existe" };
  }
};

const deleteAUser = async (email: string) => {
  if (await thisUserExists(email)) {
    return await deleteUser(email);
  } else {
    return { error: "usuario inexistente" };
  }
};

const updateAUser = async (email: string, user: userType) => {
  if (await thisUserExists(email)) {
    return await updateUser(email, user);
  } else {
    return { error: "usuario inexistente" };
  }
};

const login = async (email: string, password: string) => {
  if (await thisUserExists(email)) {
    return await loginUser(email, password);
  } else {
    return { error: "usuario inexistente" };
  }
};



export {login, updateAUser,deleteAUser,registerUser};