const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./controller/controller");
const mongoose = require('mongoose')
const mongoose = require('mongoose')

const port = 3031;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use("/", routes);

(function(){
      mongoose.connect('mongodb://localhost:27017/library', {autoIndex: false})
        .then(() => {
          app.listen(port, () => {
            console.log(`Server is running in the port ${port}`);
          });
        })
        .catch((e) => {
            console.log(e)            
            throw new Error(`Ocorreu um erro. Tente novamente mais tarde!`)
        })
})()