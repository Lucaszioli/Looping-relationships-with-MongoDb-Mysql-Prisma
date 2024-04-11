import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import AulasRouter from '../src/domains/aulas/controller';

export const app: Express = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/aulas', AulasRouter);

export default app;