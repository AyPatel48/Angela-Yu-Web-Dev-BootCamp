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
  port: "5432",
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function getCountries() {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  console.log(result.rows);

  return countries;
}

app.get("/", async (req, res) => {
  //Write your code here.
  let countries = await getCountries();
  res.render("index.ejs", { countries: countries, total: countries.length });
});

app.post("/add", async (req, res) => {
  let country_name = req.body.country;
  try {
    const result = await db.query(
      "SELECT country_code from countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [country_name.toLowerCase()]
    );

    const data = result.rows[0];
    const country_code = data.country_code;

    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [country_code]
      );
    } catch (err) {
      console.log(err);
      const countries = await getCountries();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try again",
      });
    }
  } catch (err) {
    console.log(err);
    let countries = await getCountries();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country does not exist, try again",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
