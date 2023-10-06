import { Router } from 'express';
import HomeController from '../controllers/home.js';
import Register from '../controllers/register.js';
import loginController from '../controllers/login.js';
import dashboardController from '../controllers/dashboard.js';

const appRouter = Router()

appRouter.get('register', (req, res) => {
    res.render('register');
});
appRouter.post('/register', Register.registerUser); 
appRouter.get('/login', loginController.getLoginPage);
appRouter.post('/login', loginController.postLoginPage);
appRouter.get('/logout', loginController.logout);
appRouter.get('/dashboard', dashboardController.getDashboardPage);
appRouter.get('/', HomeController);

export default appRouter;
