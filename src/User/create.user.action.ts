import  User  from "./user.model.js";
import {userType} from "./user.model.js";
import bcrypt from "bcryptjs";
import { SALT_OR_ROUNDS, PEPPER } from "../App/config.js";

const createUser =async (user:userType):Promise<any>=>{
    try{
        const userWithPepper = user.password + PEPPER;
        user.password = await bcrypt.hash(userWithPepper, SALT_OR_ROUNDS);
        const newUser = new User(user);
        await newUser.save();
        return {success: "Usuario registrado"};
    }catch (error) {
        console.error("Hubo un error",error);
        return {error: "Error al registrar usuario"};
    }
}

export default createUser;