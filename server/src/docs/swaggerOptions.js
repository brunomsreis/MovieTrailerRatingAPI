// swaggerOptions.js

const swaggerOptions = {
    swaggerDefinition: require('./swaggerDef'),
    apis: ['./src/routes/*.ts'],
  };
  
  module.exports = swaggerOptions;
  