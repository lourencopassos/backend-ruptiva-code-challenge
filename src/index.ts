import dotenv from 'dotenv';
import { AddressInfo } from 'net';
import express from 'express';
import { userRouter } from './routes/userRouter';
import { movieRouter } from './routes/movieRouter';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

app.use('/user', userRouter);
app.use('/movie', movieRouter);

const server = app.listen(process.env.PORT || 3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});
