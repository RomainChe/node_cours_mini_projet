import User from '../models/User.js';
import bcrypt from 'bcrypt';

const registerUser = async (req, res) => {
    try {
      const { firstName, lastName, email, password, password_confirm } = req.body;
  
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).send('Cet utilisateur existe déjà.');
      }
  
      if (password !== password_confirm) {
        return res.status(400).send('Les mots de passe ne correspondent pas.');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      res.redirect('/login'); 
    } catch (error) {
      console.error(error);
      res.status(500).send('Une erreur est survenue lors de l\'inscription.');
    }
};
  
export default  {
    registerUser
};