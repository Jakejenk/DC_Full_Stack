"use strict";

const http = require("http");

const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
//const server = http.createServer(app);
const fs = require("fs");
const path = require("path");
const {
  Sequelize,
  Model,
  DataTypes
} = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("./config/config.json")[env];
const db = {};
const bodyParser = require("body-parser");

// Set up es6 Template Engine
const es6Renderer = require("express-es6-template-engine");
app.engine("html", es6Renderer);
app.set("views", "templates");
app.set("view engine", "html");

app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "templates")));

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

class User extends Model {}
class Ride extends Model {}

User.init({
  user_name: DataTypes.STRING,
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  skill_level: DataTypes.STRING,
}, {
  sequelize,
  modelName: "User",
});

Ride.init({
  user_name: DataTypes.STRING,
  date_of_ride: DataTypes.DATE,
  distance: DataTypes.INTEGER,
  location_of_ride: DataTypes.STRING,
  difficulty_level: DataTypes.STRING,
}, {
  sequelize,
  modelName: "Ride",
});

// USE THIS CODE TO CHOOSE BETWEEN HEROKU SERVER AND EXPRESS SERVER

// This is the way to start the server on heroku
// app.listen(process.env.PORT || 8000, () => console.log("Server is running..."));

// This is the way to start the server locally
app.listen(3300, function() {
  console.log("Server is running on localhost:3300");
});

// get for loggin in users
app.get("/loginAttempt", async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
});

// add a user
app.post("/registration", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  // const salt = await bcrypt.genSalt(10);
  bcrypt.genSalt(10, (err, salt) => {
    const hash = bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (!err) {
        User.create({
          user_name: req.body.user_name,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hash,
          skill_level: req.body.skill_level,
        });
        res.status(200).send("User added");
        console.log("user was registered");
      }
    });
  });
  // try {
  //   // users.push(user)
  //   res.status(201).send()
  // } catch {
  //   res.status(404).send()
  // }
});

// get all users
app.get("/users", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const users = await User.findAll();
  console.log(users);
  res.status(200).send(users);
  //console.log(users);
});

// get one user
app.get("/users/:id", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let userId = req.params["id"];
  const users = await User.findAll({
    where: {
      id: userId
    },
  });
  res.status(200).send(users);
  //console.log(users);
});

// add a user
app.post("/users", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  await User.create({
    user_name: req.body.user_name,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    skill_level: req.body.skill_level,
  });
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      name: req.body.name,
      password: hashedPassword
    };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
  res.status(200).send("User added");
  //console.log(users);
});

// app.post('/users/login', async (req, res) => {
//   const user = users.find(user => user.name === req.body.name)
//   if (user == null) {
//     return res.status(400).send('Cannot find user')
//   }
//   try {
//     if(await bcrypt.compare(req.body.password, user.password)) {
//       res.send('Success')
//     } else {
//       res.send('Not Allowed')
//     }
//   } catch {
//     res.status(500).send()
//   }
// })

// update a user
app.put("/users/:id", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let userId = req.params["id"];
  const users = await User.update({
    user_name: req.body.user_name,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    skill_level: req.body.skill_level,
  }, {
    where: {
      id: userId,
    },
  });
  res.status(200).send("User updated");
  //console.log(users);
});

// delete a user
app.delete("/users/:id", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let userId = req.params["id"];
  const users = await User.destroy({
    where: {
      id: userId
    },
  });
  res.status(200).send("User was deleted");
  //console.log(users);
});

// get all rides
app.get("/rides", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const rideData = await Ride.findAll();
  // console.log(rideData);
  res.status(200).send(rideData);
});

// get a single ride
app.get("/rides/:date_of_ride/:user_name", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let ridesDate = req.params["date_of_ride"];
  const rides = await rides.findAll({

    where: {
      [op.and]: [{
        date: ridesDate
      }]
    },

    //WHERE date = ridesDATE AND user_name = userId
  });
  res.status(200).send(rides);
  //console.log(rides);
});

// post a new ride

app.post("/rides", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  await Ride.create({
    user_name: req.body.user_name,
    date_of_ride: req.body.date_of_ride,
    location_of_ride: req.body.location_of_ride,
    distance: req.body.distance,
    difficulty_level: req.body.difficulty_level,
  });

  res.status(200).send("Ride added");
  // console.log(rides);
});

// delete a ride
app.delete("/rides", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let ridesId = req.params["id"];
  const rides = await rides.destroy({
    where: {
      id: ridesId
    },
  });
  res.status(200).send("Ride was deleted");
  //console.log(rides);
});


// This is the start of the template engine calls
app.get("/home", (req, res) => {
  res.render("home", {
    // locals: {
    //   title: "Address Book App",
    // },
    partials: {
      navbar: "partials/navbar",
      head: "partials/head"
    },
  });
});

app.get("/", (req, res) => {
  res.render("home", {
    // locals: {
    //   title: "Address Book App",
    // },
    partials: {
      navbar: "partials/navbar",
      head: "partials/head"
    },
  });
});

app.get("/about", (req, res) => {
  res.render("about-us", {
    // locals: {
    //   title: "Address Book App",
    // },
    partials: {
      navbar: "partials/navbar",
      head: "partials/head"
    },
  });
});

app.get("/login", (req, res) => {
  res.render("login", {
    // locals: {
    //   title: "Address Book App",
    // },
    partials: {
      navbar: "partials/navbar",
      head: "partials/head"
    },
  });
});

app.get("/registration", (req, res) => {
  res.render("registration", {
    // locals: {
    //   title: "Address Book App",
    // },
    partials: {
      navbar: "partials/navbar",
      head: "partials/head"
    },
  });
});