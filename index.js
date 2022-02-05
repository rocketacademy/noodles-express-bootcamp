import express from 'express';
import {read} from './jsonFileStorage.js';

const app = express();

const getRecipe = (request, response) => {
  read('data.json', (readErr, data) => {
    if (!readErr) {
      const index = request.params.index;

      if (data['recipes'][index] === undefined) {
        response.status(404).send('Sorry, we cannot find that!');
      } else {
        response.send(data['recipes'][index]);
      }
    }
  });
};

const getRecipesByLabel = (request, response) => {
  read('data.json', (readErr, data) => {
    if (!readErr) {
      const label = request.params.label.replace(/-/g, " ");
      const regularExp = new RegExp(`${label}`, 'i');
      const filteredData = data['recipes'].filter((recipe) => {
        return recipe["label"].match(regularExp);
      });

      if (filteredData.length === 0) {
        response.status(404).send('Sorry, we cannot find that!');
      } else {
        response.send(filteredData);
      }
    }
  });
}

const getRecipesByYield = (request, response) => {
  read('data.json', (readErr, data) => {
    if (!readErr) {
      const filteredData = data['recipes'].filter((recipe) => {
        return recipe["yield"] === parseInt(request.params.yield);
      });

      if (filteredData.length === 0) {
        response.status(404).send('Sorry, we cannot find that!');
      } else {
        response.send(filteredData);
      }
    }
  });
}

app.get('/yield/:yield', getRecipesByYield);
app.get('/recipe-label/:label', getRecipesByLabel);
app.get('/recipe/:index', getRecipe);

app.listen(3004);

