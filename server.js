import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import User from './models/User.js';
import Auth from './routes/routes.js'

import route from './routes/routes.js';

// ==========
// App initialization
// ==========

dotenv.config();
const { APP_HOSTNAME, APP_PORT, NODE_ENV, MONGODB_URI, MONGO_DB_NAME } = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'votre_secret_key',
  resave: false,
  saveUninitialized: true,
}));
app.locals.pretty = NODE_ENV !== 'production'; // Indente correctement le HTML envoyé au client (utile en dev, mais inutile en production)

// ==========
// App middlewares
// ==========

app.use(express.static(path.join(__dirname, 'public')));

// ==========
// App routers
// ==========

app.use('/', route);

app.use('/register', Auth);

// ==========
// App start
// ==========

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connexion à MongoDB réussie');
  })
  .catch((error) => {
    console.error('Erreur de connexion à MongoDB :', error);
  });

app.listen(APP_PORT, () => {
  console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
});
