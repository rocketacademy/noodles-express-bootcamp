import express from 'express';
import { read } from './jsonFileStorage.js'; 
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
const PORT = 3004;

const whenIncomingRequest = (req, res) => {
  console.log('request  came in');

  read('data.json', (data, err) => {
    if (err) {
      console.log('read error', err);
    }

    const { recipes } = data; 
    res.render('index', { recipes });
  });
};

const whenIncomingRequestIndex = (req, res) => {
  console.log('request came in ');

  read('data.json', (data, error) => {
    if (error) {
      console.log('read error', error);
    }

    const { index } = req.params;

    const recipe = data.recipes[index];
    console.log(recipe);

    res.render('recipe', { recipe });
  });
};

app.get('/', whenIncomingRequest);
app.get('/recipes/:index', whenIncomingRequestIndex);
app.listen(PORT);