import express from 'express';
import { read } from './jsonFileStorage.js';

const app = express();

const handleRecipeReq = (req, res) => {
  console.log(`received req for recipe index ${req.params.index}`);
  read('data.json', (err, { recipes }) => {
    if (!err) {
      // server error checking
      if (recipes[req.params.index] === undefined) {
        console.log(`cannot find recipe index ${req.params.index}`)
        res.status(404).send('Sorry, we cannot find that!');
        return;
      }
      // get recipe by index
      const content = recipes[req.params.index];
        console.log(`sending res for recipe index ${req.params.index}`);
        res.send(content);
    }
  });
};

const handleYieldReq = (req, res) => {
  console.log(`received req for yields of ${req.params.yieldnum} portions`);
  read('data.json', (err, { recipes }) => {
    if (!err) {
      // get recipe by yield
      const content = [];
      recipes.forEach((recipe) => {
        if (recipe.yield === Number(req.params.yieldnum)) {
          content.push(recipe);
        }
      });
      if (content.length === 0) {
        console.log(`cannot find yields of ${req.params.yieldnum} portions`);
        res.status(404).send('Sorry, we cannot find that!');
        return;
      }
      console.log(`sending res for yields of ${req.params.yieldnum} portions`);
      res.send(content);
    }
  });
};

const handleLabelReq = (req, res) => {
  console.log(`received req for ${req.params.label} recipe`);
  read('data.json', (err, { recipes }) => {
    if (!err) {
      recipes.forEach((recipe) => {
        // format labels into lowercase kebab
        const recipeLabel = recipe.label.toLowerCase().split(' ').join('-');
        if (recipeLabel === req.params.label) {
          const content = recipe;
          console.log(`sending req for ${req.params.label} recipe`);
          res.send(content);
        }
      });
      console.log(`cannot find ${req.params.label} recipe`);
      res.status(404).send('Sorry, we cannot find that!');
    }
  });
}

app.get('/recipe/:index', handleRecipeReq);
app.get('/yield/:yieldnum', handleYieldReq);
app.get('/recipe-label/:label', handleLabelReq);

app.listen(3004);