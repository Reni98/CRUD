var express = require('express')
var mysql = require('mysql')
var app = express()

app.use(express.json())

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "regisztracio"
})

con.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Sikeres az adatbázishoz a kapcsolódás.");
    }

})

app.post('/post', (req, res) => {
    const id = req.body.id;
    const felhnev = req.body.felhnev;
    const email = req.body.email;
    const jelszo = req.body.jelszo;

    con.query('insert into felhasznalo values(?,?,?,?)', [id, felhnev, email, jelszo], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Az adatok hozzá lettek adva.")
        }
    })
})

app.delete('/delete/:id', (req, res) => {
    const delid = req.params.id;
    con.query('delete from felhasznalo where id=?', delid, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Az adatok törölve lettek az adatbázisból.")
        }
    })
}
)

app.get('/get', (req, res) => {
    con.query('select * from felhasznalo', function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const felhnev = req.body.felhnev;
    const email = req.body.email;
    const jelszo = req.body.jelszo;

    con.query('UPDATE felhasznalo SET felhnev=?, email=?, jelszo=? where id=?', [felhnev, email, jelszo, id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Az adatok modosítása sikeresen megtörtént.")
        }
    })
})
app.listen(5000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Elindult az 5000-es porton.");
    }
})