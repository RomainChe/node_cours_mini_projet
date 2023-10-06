import { Router } from 'express';
import HomeController from '../controllers/home.js';
import Register from '../controllers/register.js';
import loginController from '../controllers/login.js';

const appRouter = Router()

appRouter.get('register', (req, res) => {
    res.render('register');
});
appRouter.post('/register', Register.registerUser); 
appRouter.get('/login', loginController.getLoginPage);
appRouter.get('/login', loginController.logout);
appRouter.post('/login', loginController.postLoginPage);
appRouter.get('/', HomeController);

export default appRouter;
