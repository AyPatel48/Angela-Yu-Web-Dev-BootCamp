import express from "express";
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});

app.get("/", (req, res) =>{
  console.log(req);
  res.send("<h1>Hello World!</h1>");
});