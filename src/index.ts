import express from 'express';
import dotenv from 'dotenv'
dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'})
import './database/connection';
import "reflect-metadata";

import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.listen(process.env.PORT || 3333);
