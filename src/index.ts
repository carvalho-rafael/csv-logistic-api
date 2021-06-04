import express from 'express';
import dotenv from 'dotenv'
dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'})
import './database/connection';
import "reflect-metadata";
import 'express-async-errors'

import cors from 'cors';
import routes from './routes'
import errorHandler from './errors/handler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(process.env.PORT || 3333);
