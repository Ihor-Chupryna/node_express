import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3300;

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
