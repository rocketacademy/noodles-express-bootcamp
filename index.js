import express from 'express';
import { read } from './jsonFileStorage.js';

const app = express();

const handleRecipeReq = (req, res) => {
  console.log(`received req for recipe index ${req.params.index}`);
  let content = '';
  read('data.json', (err, { recipes }) => {
    if (!err) {
      // server error checking
      if (recipes[req.params.index] === undefined) {
        console.log(`cannot find recipe index ${req.params.index}`)
        res.status(404).send('Sorry, we cannot find that!');
        return;
      }
      // get recipe by index
      content = recipes[req.params.index];
        console.log(`sending res for recipe index ${req.params.index}`);
        res.send(content);
    }
  });
};

app.get('/recipe/:index', handleRecipeReq);

app.listen(3004);