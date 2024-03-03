import config from 'config';
import express from 'express';
import { handlerMiddleware } from './lib/middleware';
import helloComponentRoutes from './components/hello/api';

const app = express();
const PORT = config.get('port');

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection', reason);
  process.exit(1);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Components
app.use(helloComponentRoutes);

// Common API error handler
app.use(handlerMiddleware());

const getServerPromise = () => {
  return new Promise(resolve => {
    const server = app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
      resolve(server);
    });
  });
};

export default {
  serverPromise: getServerPromise(),
};
