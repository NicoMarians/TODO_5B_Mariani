const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const fs = require('fs');
const mysql = require('mysql2');
const conf = JSON.parse(fs.readFileSync("public/conf.json")).dbLogin;

conf.ssl.ca = fs.readFileSync(__dirname + '/ca.pem');
const connection = mysql.createConnection(conf);

let todos = [];




//SERVIZI

app.post("/todo/add", (req, res) => {
    const newActivity = req.body;
    insert(newActivity)
    res.json({ result: "Ok" });
});

app.get("/todo", (req, res) => {
    select().then((data) => {
        console.log(todos);
        todos = data
        res.json(todos);
    })
    
});

app.delete("/todo/:id", (req, res) => {
    const { id } = req.params;
    deleteTodo(id).then((result) => {
        res.json({ result: "Ok" });
    })
    
});


//SERVIZI DATABASE

const executeQuery = (query,parametri) => {
    return new Promise((resolve, reject) => {      
          connection.query(query,parametri, (err, result) => {
             if (err) {
                console.error(err);
                reject();     
             }   
             console.log('done');
             resolve(result);         
       });
    })
}

const createTable = () => {
    return executeQuery(`
    CREATE TABLE IF NOT EXISTS todo
        ( 
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        data DATE,
        orario TIME,
        descrizione VARCHAR(255)
        )`);      
}

const insert = (todo) => {
    const sql = `INSERT INTO todo (name, data, orario, descrizione) VALUES (?, ?, ?, ?)`;

    let date = todo.date == "" ? null : todo.date;
    let time = todo.time == "" ? null : todo.time;

    const values = [
        todo.name, 
        date,  
        time, 
        todo.description
    ];

    return executeQuery(sql, values);
}

const select = () => {
    const sql = `SELECT id, name, data, orario, descrizione FROM todo `;
    return executeQuery(sql); 
 }

 const deleteTodo = (id) => {
    const sql = `DELETE FROM todo WHERE id = ?`;

    return new Promise((resolve, reject) => {
        connection.query(sql, [id], (err, result) => {
            if (err) {
                console.error("Errore:", err);
                reject(err);
            }
            resolve(console.log("OK"));
        });
    });
};


 createTable().then(() => {
    //PER RESETTARE LA TABELLA
    //executeQuery("DROP TABLE todo");
});
 
 app.listen(80, () => console.log(`Server running`));