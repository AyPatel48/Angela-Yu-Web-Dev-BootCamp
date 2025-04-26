import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'permalist',
  password: 'pg#1234',
  port: 5432
});

db.connect();

async function getFreshData() {
  const result = await db.query("SELECT * FROM items");
  return result.rows;
}

app.get("/", async (req, res) => {
  const items = await getFreshData();
  console.log(items);
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item_title = req.body.newItem;
  console.log(item_title);
  try {
    await db.query("INSERT INTO items (title) VALUES ($1)", [item_title]);
  } catch (err) {
    console.log(err);
  }
  
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const itemId = req.body.updatedItemId;
  const title = req.body.updatedItemTitle;

  try {
    await db.query("UPDATE items SET title = $1 WHERE id = $2", [title, itemId]);
  } catch (error) {
    console.log(error);
  }

  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;

  try {
    await db.query("DELETE FROM items WHERE id = $1", [id]);
  } catch (error) {
    console.log(error);
  }

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
