const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Simple Book API',
      version: '1.0.0',
      description: 'A simple API to manage books',
    },
  },
  apis: ['./index.js'], // Path to the API file(s) containing the route definitions
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware to serve the Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Sample data (You can replace this with your own data source)
const books = [
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' },
  { id: 3, title: 'Book 3', author: 'Author 3' },
];

// Endpoint to get all books
/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     description: Returns a list of all books.
 *     responses:
 *       200:
 *         description: Successful response with the list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 */
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Endpoint to get a specific book by ID
/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     description: Returns a specific book based on the provided ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the book to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response with the book details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *       404:
 *         description: Book not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
app.get('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((book) => book.id === bookId);

  if (!book) {
    res.status(404).json({ error: 'Book not found' });
  } else {
    res.json(book);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
