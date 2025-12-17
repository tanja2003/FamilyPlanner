const express = require('express');
const path = require('path');

const supabase = require('./supabase');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Root
app.get('/', (req, res) => {
    console.log("a");
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



/* GET */
app.get('/homeoffice', async (req, res) => {
  console.log("b");
  const { data, error } = await supabase
    .from('homeoffice')
    .select('*')
    .order('date');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

/* POST */
app.post('/homeoffice', async (req, res) => {
  const { user, date, status } = req.body;

  const { error } = await supabase
    .from('homeoffice')
    .insert([
      { user_name: user, date, status }
    ]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ ok: true });
});

/* DELETE */
app.delete('/homeoffice/:id', async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
      .from('homeoffice')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ ok: true });
})

if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server läuft lokal auf http://localhost:${PORT}`);
  });
}

module.exports = app;
