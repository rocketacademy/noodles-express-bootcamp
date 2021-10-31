import express from 'express';
import { read } from './jsonFileStorage.js';

const app = express();

app.get('/recipe/:index', (req, res) => {
  read('data.json', (err, content) => {
    if(err){
      console.log(err);
      return;
    }
    const {index} = req.params;
    if (!(index >= 0)){
      res.status(404).send('Oi! Type properly! <br> Enter a number from 0');
    }
    res.send(content.recipes[index]);
  })
});

app.get('/yield/:amount', (req, res) => {
  read('data.json', (err, content) => {
    if(err){
      console.log(err);
      return;
    }
    const { amount } = req.params;
    const recipeArray = content.recipes;
    let output = '';
    for (let i = 0; i < recipeArray.length; i += 1){
      if(recipeArray[i].yield === Number(amount)){
        output += `Recipe: ${recipeArray[i].label} <br> Yield: ${recipeArray[i].yield} <br> Category: ${recipeArray[i].category} <br> <br>`;
      }
    }
  res.send(output);
  })
});

app.listen(3004);