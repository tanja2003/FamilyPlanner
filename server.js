const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());


// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Root
app.get('/', (req, res) => {
    console.log("a");
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


const sqlite3 = require('sqlite3').verbose();
// SQLite DB initialisieren
const db = new sqlite3.Database('./planner.db', (err) => {
    if(err) console.error(err.message);
    else console.log('Connected to SQLite DB.');
});

db.serialize(() => {
    db.run(
    `CREATE TABLE IF NOT EXISTS homeoffice(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT,
    date TEXT NOT NULL,
    status TEXT NOT NULL)`
)})


// Test-API
let homeoffice = [];

app.get('/homeoffice', (req, res) => {
    console.log("b");
  db.all(`SELECT * from homeoffice`, [],
    function (err, rows) {
      if (err) return res.status(500).json({error: err.message });
      res.json(rows);
    }
  );
});

app.post('/homeoffice', (req, res) => {
    console.log("c");
  const { user, date, status } = req.body;
  db.run(`INSERT INTO homeoffice (user, date, status) VALUES (?,?,?)`,
    [user, date, status],
    (err) => {
      if (err) return res.status(500).json({ error:err.message});
    }
 )  
  
  homeoffice.push({ user, date, status });
  res.json({ ok: true });
});

app.delete('/homeoffice/:id', (req, res) => {
    db.run(`DELETE FROM homeoffice WHERE id=? `, [req.params.id], 
        function(err){
        if(err) res.status(500).json({ error: err.message });
        else res.json({ deleted: this.changes });
    });
})

if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server läuft lokal auf http://localhost:${PORT}`);
  });
}

module.exports = app;
