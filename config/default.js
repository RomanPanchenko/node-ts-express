const defer = require('config/defer').deferConfig;
const ENV = process.env.NODE_ENV;

module.exports = {
  env: ENV,
  port: 3000,
  logger: {
    include_stack: true,
  }
};
