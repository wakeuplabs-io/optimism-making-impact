import adminMiddleware from './admin.js';
import errorMiddleware from './errors.js';

const middlewares = {
  ...errorMiddleware,
  ...adminMiddleware,
};

export default middlewares;
