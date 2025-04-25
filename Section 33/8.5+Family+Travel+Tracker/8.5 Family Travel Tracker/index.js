import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "pg#1234",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries WHERE user_id = $1;", [currentUserId]);
  const countries = result.rows.map((row) => row.country_code);

  const usersResult = await db.query("SELECT * FROM users;");
  return {countries: countries, users: usersResult.rows};
}

app.get("/", async (req, res) => {
  const {countries, users} = await checkVisisted();
  console.log(users);
  console.log(users[currentUserId - 1].color);
  console.log(countries);
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: users[currentUserId - 1].color,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  
  if(req.body.user) {
    currentUserId = parseInt(req.body.user);
    res.redirect("/");
  }
  else if (req.body.add){
    res.render("new.ejs");
  }
  else {
    res.status(400).send('Unknown action');
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  if(req.body.name && req.body.color) {
    const name = req.body.name;
    const color = req.body.color;

    try {
      const result = await db.query("INSERT INTO users (name, color) VALUES ($1, $2) RETURNING id, name, color", [name, color]);

      const newUser = result.rows[0];
      currentUserId = newUser["id"];
      console.log(newUser);
      console.log(currentUserId);
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  }
  else {
    res.render("new.ejs");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
