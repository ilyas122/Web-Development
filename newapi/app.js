const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Define a route to fetch data from the JSONPlaceholder API
app.get('/', async (req, res) => {
    try {
      const response = await axios.get('https://meowfacts.herokuapp.com/');
      const data = response.data;
      res.render('index', { data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching cat facts from the API.' });
    }
  });
  
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
