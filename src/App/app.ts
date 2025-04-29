/** importar las librerias necesarias */

import express from 'express';
import { APP_PORT } from './config.js';

const app = express();


//init the server
app.listen(APP_PORT,()=>{
    console.log(`Server is running on port ${APP_PORT}`);
})
