/** importar las librerias necesarias */

import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import { APP_PORT } from './config.js';
import users from '../User/user.route.js';
import books from '../Book/book.route.js';
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.use(users);
app.use(books);

// fallback
app.use(async (req: Request, res: Response) => {
  res.status(404).json({ msg: "Not found" });
});

//init the server
app.listen(APP_PORT,()=>{
    console.log(`Server is running on port ${APP_PORT}`);
})
