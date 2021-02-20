import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import CategoryController from './app/controllers/CategoryController';
import ProductController from './app/controllers/ProductController';
import authMiddleare from './app/middlewares/auth';

const { Router } = require('express');

const routes = new Router();

// Users routes
routes.post('/users', UserController.create);

// Session routes
routes.post('/sessions', SessionController.create);

// Use Middleare
routes.use(authMiddleare);

// Categories routes
routes.get('/categories', CategoryController.index);
routes.post('/categories', CategoryController.create);
routes.put('/categories/:id', CategoryController.update);
routes.delete('/categories/:id', CategoryController.delete);

// Products routes
routes.get('/products', ProductController.index);
routes.post('/products', ProductController.create);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

module.exports = routes;
