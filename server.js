const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); 

app.use(express.json());

const todos = [];

app.post("/todo/add", (req, res) => {
   const newActivity = req.body;
   todos.push(newActivity);
   res.json({ result: "Ok" });
});

app.get("/todo", (req, res) => {
   res.json(todos);
});

app.delete("/todo/:id", (req, res) => {
   todos.splice(req.params.id, 1);
   res.json({ result: "Ok" });
});

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(80, () => {
   console.log("- server running");
});
