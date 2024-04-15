import { Express } from 'express';
import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export default function setupSwagger(app: Express) {

    const swaggerOptions: Options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Movie Trailer Rating API Documentation',
                version: '1.0.0',
            },
            components: {
                schemas: {
                    Movie: {
                        type: 'object',
                        properties: {
                            title: { type: 'string' },
                            description: { type: 'string' },
                            category: { type: 'string' }
                        },
                        required: ['title', 'description', 'category']
                    },
                    User: {
                        type: 'object',
                        properties: {
                            name: { type: 'string' },
                            email: { type: 'string' },
                            password: { type: 'string' },
                            role: { type: 'string' }
                        },
                        required: ['name', 'email', 'password', 'role']
                    },
                    Rating: {
                        type: 'object',
                        properties: {
                            userId: { type: 'string' },
                            movieId: { type: 'string' },
                            rating: { type: 'number' }
                        },
                        required: ['userId', 'movieId', 'rating']
                    },
                    Comment: {
                        type: 'object',
                        properties: {
                            userId: { type: 'string' },
                            movieId: { type: 'string' },
                            text: { type: 'string' }
                        },
                        required: ['userId', 'movieId', 'text']
                    }
                }
            }
        },
        apis: [
            './src/routes/movies.ts',
            './src/routes/users.ts',
            './src/routes/ratings.ts',
            './src/routes/comments.ts'
        ],
    };

    const specs = swaggerJsdoc(swaggerOptions);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}
