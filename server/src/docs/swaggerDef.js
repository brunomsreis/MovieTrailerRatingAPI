// swaggerDef.js

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Movie Trailer API',
      version: '1.0.0',
      description: 'API to manage movie trailers and user authentication',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  };
  
  module.exports = swaggerDefinition;
  