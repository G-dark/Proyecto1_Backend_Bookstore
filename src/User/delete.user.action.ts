import User from "./user.model.js";

const deleteUser = async (email: string) => {
  const res = await User.updateOne(
    { email: email },
    { email: email, deleted: true, deleteAt: new Date() }
  );
  if (res.modifiedCount === 0) {
    return { error: "No se pudo eliminar usuario" };
  }
  return { success: "Usuario eliminado" };
};
export default deleteUser;
