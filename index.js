import express from 'express';
import { read } from './jsonFileStorage.js';

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

/**
 * Compare recipes.
 * @param {*} first First recipe.
 * @param {*} second Second recipe.
 * @returns True, if same recipes. False, otherwise.
 */
const isSameRecipe = (first, second) => (first.source.toLowerCase() === second.source.toLowerCase())
  && (first.label.toLowerCase() === second.label.toLowerCase());

/**
 * Check if recipe is in list.
 * @param {*} recipe Recipe.
 * @param {*} recipeList List of recipes.
 * @returns True, if recipe is in list. False, otherwise.
 */
// eslint-disable-next-line arrow-body-style
const isRecipeInList = (recipe, recipeList) => {
  return recipeList.find((filteredRecipe) => isSameRecipe(filteredRecipe, recipe));
};

/**
 * Compare recipes used for sorting.
 * @param {*} first First recipe.
 * @param {*} second Second recipe.
 * @param {*} sortBy Sort By.
 * @param {*} sortOrder Sort Order: Ascending / Descending.
 * @returns -1 if first < second, 1 if first > second, 0 if equals.
 */
const compareRecipes = (first, second, sortBy, sortOrder) => {
  const firstRecipeAttr = first[sortBy] || '';
  const secondRecipeAttr = second[sortBy] || '';

  // get attributes to compare
  let firstRecipe = firstRecipeAttr;
  if (!Number.isInteger(firstRecipe)) {
    firstRecipe = firstRecipe.toUpperCase();
  }
  let secondRecipe = secondRecipeAttr;
  if (!Number.isInteger(secondRecipe)) {
    secondRecipe = secondRecipe.toUpperCase();
  }

  // return comparison result
  if (firstRecipe < secondRecipe) {
    return (sortOrder === 'desc') ? 1 : -1;
  }
  if (firstRecipe > secondRecipe) {
    return (sortOrder === 'desc') ? -1 : 1;
  }
  return 0;
};

/**
 * Handle list of recipes request.
 */
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

/**
 * Handles request of recipe by index.
 */
const handleRecipeByIndex = (req, res) => {
  // eslint-disable-next-line no-restricted-globals
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

/**
 * Handles request of recipes by yield.
 * Returns json data format.
 */
const handleRecipeByYield = (req, res) => {
  // eslint-disable-next-line no-restricted-globals
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

/**
 * Handles request of recipes by label.
 * Returns json data format.
 */
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

/**
 * Handles request of recipes by category.
 */
const handleRecipesByCategory = (req, res) => {
  read('data.json', (err, data) => {
    if (!err) {
      const recipes = [];

      // get recipes in category
      for (let i = 0; i < data.recipes.length; i += 1) {
        const recipe = data.recipes[i];

        if ((recipe.category !== undefined)
        && (recipe.category.toLowerCase() === req.params.category)
        && (!isRecipeInList(recipe, recipes))) {
          recipe.index = i;
          recipes.push(recipe);
        }
      }

      // sort recipes
      if (req.query.sortBy) {
        // eslint-disable-next-line max-len
        recipes.sort((first, second) => compareRecipes(first, second, req.query.sortBy, req.query.sortOrder));
      }

      if (recipes.length > 0) {
        res.render('category', { recipes, sortBy: req.query.sortBy, sortOrder: req.query.sortOrder });
      } else {
        res.status(404).send('Sorry, we cannot find that!');
      }
    }
  });
};

app.get('/', handleRecipeList);
app.get('/recipe/:index', handleRecipeByIndex);
app.get('/category/:category', handleRecipesByCategory);
app.get('/yield/:portion', handleRecipeByYield);
app.get('/recipe-label/:label', handleRecipeByLabel);

app.listen(3004);
