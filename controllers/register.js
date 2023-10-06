import User from "../models/User.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, password_confirm } = req.body;

    if (!firstName || !lastName || !email || !password || !password_confirm) {
      const errorMessage = "Tous les champs sont obligatoires.";
      return res.render("home", { errorMessage });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const errorMessage = "Cet utilisateur existe déjà.";
      return res.render("home", { errorMessage });
    }

    if (password !== password_confirm) {
      const errorMessage = "Les mot de passe ne sont pas identiques !";
      return res.render("home", { errorMessage });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    req.flash("success", "Bien jouez ! Vous avez créer votre compte !");
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Une erreur est survenue lors de l'inscription.");
  }
};

export default {
  registerUser,
};
