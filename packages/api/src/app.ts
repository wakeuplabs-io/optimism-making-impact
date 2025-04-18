import { envParsed } from '@/config/env-parsed.js';
import middlewares from '@/middlewares/index.js';
import routes from '@/routes/index.js';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import serverless from 'serverless-http';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(middlewares.validateAdmin);

app.use('/api', routes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

if (envParsed.NODE_ENV === 'development') {
  app.listen(envParsed.PORT, () => {
    console.log(`App Started at PORT=${envParsed.PORT}`);
  });
}

export const handler = serverless(app);
