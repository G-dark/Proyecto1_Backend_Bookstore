import  Book  from "./book.model.js";
import { bookType } from "./book.model.js";


export const createBook =async (book:bookType)=>{
    try{
        const newBook = new Book(book);
        await newBook.save();
        return {success: "Libro creado"};
    }catch (error) {
        console.error("Hubo un error",error);
        return {error: "Error al crear el libro"};
    }
}
