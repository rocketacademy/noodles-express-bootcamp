import express from 'express';
import { read } from './jsonFileStorage.js';

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

const handleRecipeList = (req, res) => {
  read('data.json', (err, data) => {
    if (!err) {
      // eslint-disable-next-line max-len
      const recipes = [...new Set(data.recipes.filter((recipe) => recipe.category !== undefined).map((recipe) => recipe.category))];

      if (recipes.length > 0) {
        res.render('recipes', { recipes });
      } else {
        res.status(404).send('Sorry, we cannot find that!');
      }
    }
  });
};

const handleRecipeByIndex = (req, res) => {
  if (isNaN(req.params.index)) {
    res.status(404).send('Sorry, we cannot find that!');
    return;
  }

  read('data.json', (err, data) => {
    if (!err) {
      const recipe = data.recipes[req.params.index];

      if (recipe) {
        res.render('recipe', { recipe });
      } else {
        res.status(404).send('Sorry, we cannot find that!');
      }
    }
  });
};

const handleRecipeByYield = (req, res) => {
  if (isNaN(req.params.portion)) {
    res.status(404).send('Sorry, we cannot find that!');
    return;
  }

  const portion = parseInt(req.params.portion, 10);
  read('data.json', (err, data) => {
    if (!err) {
      const recipes = data.recipes.filter((recipe) => recipe.yield === portion);

      if (recipes.length > 0) {
        res.send(recipes);
      } else {
        res.status(404).send('Sorry, we cannot find that!');
      }
    }
  });
};

const handleRecipeByLabel = (req, res) => {
  const label = req.params.label.replaceAll('-', ' ');
  read('data.json', (err, data) => {
    if (!err) {
      const recipes = data.recipes.filter((recipe) => recipe.label.toLowerCase() === label);

      if (recipes.length > 0) {
        res.send(recipes);
      } else {
        res.status(404).send('Sorry, we cannot find that!');
      }
    }
  });
};

const handleRecipesByCategory = (req, res) => {
  read('data.json', (err, data) => {
    if (!err) {
      // eslint-disable-next-line max-len
      // const recipes = data.recipes.filter((recipe) => (recipe.category !== undefined) && (recipe.category.toLowerCase() === req.params.category));

      const recipes = [];
      for (let i = 0; i < data.recipes.length; i += 1) {
        const recipe = data.recipes[i];

        if ((recipe.category !== undefined)
        && (recipe.category.toLowerCase() === req.params.category)) {
          recipes.push({
            label: recipe.label,
            category: recipe.category,
            index: i,
          });
        }
      }

      if (recipes.length > 0) {
        res.render('category', { recipes });
      } else {
        res.status(404).send('Sorry, we cannot find that!');
      }
    }
  });
};

app.get('/', handleRecipeList);
app.get('/recipe/:index', handleRecipeByIndex);
app.get('/yield/:portion', handleRecipeByYield);
app.get('/recipe-label/:label', handleRecipeByLabel);
app.get('/category/:category', handleRecipesByCategory);

app.listen(3004);
