import express from 'express';
import { read } from './jsonFileStorage.js';

const app = express();

const handleRecipeByIndex = (req, res) => {
  if (isNaN(req.params.index)) {
    res.status(404).send('Sorry, we cannot find that!');
    return;
  }
  read('data.json', (err, data) => {
    res.send(data.recipes[req.params.index]);
  });
};
app.get('/recipe/:index', handleRecipeByIndex);

const handleRecipeByYield = (req, res) => {
  if (isNaN(req.params.portion)) {
    res.status(404).send('Sorry, we cannot find that!');
    return;
  }

  const portion = parseInt(req.params.portion, 10);
  read('data.json', (err, data) => {
    res.send(data.recipes.filter((recipe) => recipe.yield === portion));
  });
};
app.get('/yield/:portion', handleRecipeByYield);

const handleRecipeByLabel = (req, res) => {
  const label = req.params.label.replaceAll('-', ' ');
  read('data.json', (err, data) => {
    res.send(data.recipes.filter((recipe) => recipe.label.toLowerCase() === label));
  });
};
app.get('/recipe-label/:label', handleRecipeByLabel);

app.listen(3004);
