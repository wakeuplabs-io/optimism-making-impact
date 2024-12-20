import errorMiddleware from './errors.js';

const middlewares = {
  ...errorMiddleware,
};

export default middlewares;

// TODO: do not use a file just to import and export other files