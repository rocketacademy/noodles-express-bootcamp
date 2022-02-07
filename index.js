import express from 'express';
import { read } from './jsonFileStorage.js';

const PORT = 3004;

const app = express();

/**
 * http://localhost:3004/recipe/0
 */

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

/**
 * http://localhost:3004/yield/1
 */

const whenIncomingRequestYield = (request, response) => {
  console.log('request came in ');

   read('data.json', (data, error) => {

    if (error) {
      console.log('read error', error);
    }

    const portion = parseInt(request.params.portion, 10);

    const recipes = data.recipes.filter((recipe) => recipe.yield === portion);

    if (recipes.length > 0) response.send(recipes);
    else response.status(404).send('Sorry, we cannot find that!');
});
};
/** Example
 * http://localhost:3004/recipe-label/udon-noodle-soup
 */
const whenIncomingRequestLabel = (request, response) => {
  console.log('request came in ');

   read('data.json', (data, error) => {

    if (error) {
      console.log('read error', error);
    }

    const kebabCase = string => string.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, '-').toLowerCase();

    const label = request.params.label;
    console.log(label);
    const recipes = data.recipes.filter((recipe) => kebabCase(recipe.label) === label);

    if (recipes.length>0) response.send(recipes);
    else response.status(404).send('Sorry, we cannot find that!');
});
};

app.get('/recipe/:index', whenIncomingRequestIndex);
app.get('/yield/:portion',whenIncomingRequestYield);
app.get('/recipe-label/:label',whenIncomingRequestLabel);
app.listen(PORT);