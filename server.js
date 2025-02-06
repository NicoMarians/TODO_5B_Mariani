const express = require("express");
const app = express();
const path = require("path");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

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
    const { id } = req.params;
   todos.splice(id, 1);
   res.json({ result: "Ok" });
});

app.listen(80, () => console.log(`Server running`));
