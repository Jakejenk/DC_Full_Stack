class User extends Model {}

User.init(
  {
    user_name: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    skill_level: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
  }
);

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
    where: { id: userId },
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

  res.status(200).send("User added");
  //console.log(users);
});

// update a user
app.put("/users/:id", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let userId = req.params["id"];
  const users = await User.update(
    {
      user_name: req.body.user_name,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      skill_level: req.body.skill_level,
    },
    {
      where: {
        id: userId,
      },
    }
  );
  res.status(200).send("User updated");
  //console.log(users);
});

// delete a user
app.delete("/users/:id", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let userId = req.params["id"];
  const users = await User.destroy({
    where: { id: userId },
  });
  res.status(200).send("User was deleted");
  //console.log(users);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});