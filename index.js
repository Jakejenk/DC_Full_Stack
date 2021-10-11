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

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at port ` + port);
});

// Set up es6 Template Engine
const es6Renderer = require("express-es6-template-engine");
app.engine("html", es6Renderer);
app.set("views", "templates");
app.set("view engine", "html");

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
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
  date_of_ride: DataTypes.DATEONLY,
  distance: DataTypes.INTEGER,
  location_of_ride: DataTypes.STRING,
  difficulty_level: DataTypes.STRING,
}, {
  sequelize,
  modelName: "Ride",
});

// post for Login
app.post("/loginAttempt", async (req, res) => {
  console.log("/loginAttempt route hit");
  res.setHeader("Content-Type", "application/json");
  const userName = req.body.user_name;
  const password = req.body.password;
  User.findOne({
    where: {
      user_name: userName,
    },
  }).then((user) => {
    bcrypt.compare(password, user.password, function(err, isMatch) {
      if (err) {
        throw err;
      } else if (!isMatch) {
        console.log("Password doesn't match!");
        return res.status(201).send("NoMatch");
      } else {
        // res.redirect("/home");
        res.send("Match")
        console.log("Password matches!");
      }
    });
  });
});

// register a user
app.post("/registrationAttempt", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
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
      }
    });
  });
});

// delete a ride
app.delete("/deleteRide", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let userName = req.params["user_name"];
  let date = req.params["date_of_ride"]
  const rides = await rides.destroy({
    where: {
      userName: user_name,
      date: date_of_ride
    },
  });
  res.status(200).send("Ride was deleted");
  //console.log(rides);
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
      id: userId,
    },
  });
  res.status(200).send(users);
  //console.log(users);
});

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
      id: userId,
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
  res.json(rideData);
});

// get a single ride
app.get("/rides/:date_of_ride", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const dateId = req.params["date_of_ride"];
  console.log(dateId);
  const singleRide = await Ride.findOne({
    where: {
      date_of_ride: dateId,
    },
  });
  res.status(200).send(singleRide);
  //console.log(users);
});

//   res.send(200).send(singleRide);
//   // {

//   //   where: {
//   //     ridesDate: ridesDate
//   //   },

//   //   //WHERE date = ridesDATE AND user_name = userId
//   // });
//   // res.status(200).send(rides);
//   // //console.log(rides);
// });

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
      id: ridesId,
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
      head: "partials/head",
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
      head: "partials/head",
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
      head: "partials/head",
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
      head: "partials/head",
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
      head: "partials/head",
    },
  });
});