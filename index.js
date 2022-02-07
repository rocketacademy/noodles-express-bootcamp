import express from 'express';
import { read } from './jsonFileStorage.js';

const app = express();

app.get('/recipe/:index', (req, res) => {
  // get index number from browser req
  const index = req.params.index;
  read('data.json', (err, content) => {
    if (err) {
      console.log('Read Error', err);
    }
    if (content.recipes[index]) {
      res.send(content.recipes[index]);
    } else {
      res.status(404).send('We cannot find that.');
    }
  });
});

app.listen(3004, () => {
  console.log(`Listening on port 3004`);
});
