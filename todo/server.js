const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const http = require("http");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));
const path = require('path');
app.use("/", express.static(path.join(__dirname, "public")));

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


const server = app.listen(5500, () => {
   console.log("- server running");
});
