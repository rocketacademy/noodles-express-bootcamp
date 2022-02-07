import express from 'express';
import { read } from './jsonFileStorage.js';

const PORT = 3004;

const app = express();

const whenIncomingRequestIndex = (req, res) => {
  console.log('request came in ');

  read('data.json', (data, error) => {
    if (error) {
      console.log('read error', error);
    }

    const indexOfRecipe  = req.params.index;

    const recipe = data.recipes[indexOfRecipe];

    if (recipe) {
      res.send(recipe);
    } else {
      res.status(404).send('sorry, we cannot find that!');
    }
  });
};

app.get('/recipe/:index', whenIncomingRequestIndex);
app.listen(PORT);