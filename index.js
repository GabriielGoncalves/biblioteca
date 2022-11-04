const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()
const authRoutes = require('./routes/auth')
const bookRoutes = require('./routes/books')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use('/books', authRoutes.routes);
app.use('/books', bookRoutes.routes);

(function () {
  mongoose
  .connect(process.env.DB_HOST, { autoIndex: false })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running in the port ${process.env.PORT}`);
    });
  })
    .catch((error) => {
      console.log(error)
      throw new Error(`Ocorreu um erro. Tente novamente mais tarde!`);
    });
  })();
