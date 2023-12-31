import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "12345",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
  { id: 3, title: "Finish GWAR" },
];

app.get("/", async(req, res) => {
  try{
    const result=await db.query("SELECT * FROM permalist ORDER BY id ASC");
    items=result.rows;
  
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
} catch (err){
  console.log(err);
}
});


app.post("/add",async (req, res) => {
  const item = req.body.newItem;
  try{
    await db.query("INSERT INTO items (title) VALUES ($1)",[items]);
    res.redirect("/");
  }catch (err){
    console.log(err);
  }
 
});

app.post("/edit", (req, res) => {});

app.post("/delete", (req, res) => {});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
