import User from '../models/User.js';
import bcrypt from 'bcrypt';

const getLoginPage = (req, res) => {
    res.render('login');
};

const postLoginPage = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).send('Adresse e-mail incorrecte.');
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).send('Mot de passe incorrect.');
      }
  
      req.session.user = user;
  
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send('Une erreur est survenue lors de la connexion.');
    }
};
  
const logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      }
      res.redirect('/login');
    });
};
  
export default {
    getLoginPage,
    postLoginPage,
    logout,
};