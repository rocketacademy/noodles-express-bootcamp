import express from 'express';
import { read } from './jsonFileStorage.js';

const app = express();

// default request
const handleIncomingRequest = (req, res) => {
  if (isNaN(req.params.index)) {
    res.status(404).send('Sorry, we cannot find that!');
    return;
  }
  read('data.json', (err, data) => {
    res.send(data.recipes[req.params.index]);
  });
};
app.get('/recipe/:index', handleIncomingRequest);

app.listen(3004);
