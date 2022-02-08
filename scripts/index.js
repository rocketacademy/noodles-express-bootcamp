import express from "express";
import { read } from "./jsonFileStorage.js";

const app = express();
const router = express.Router();
const FILENAME = "./public/data.json";

const getRecipeByIndex = (req, resp) => {
  const recipeIdx = parseInt(req.params.index, 10);

  read(FILENAME, (err, d) => {
    if (err) {
      resp.status(500).send({ error: { message: `json read error - ${err}` } });
      return;
    }

    if (recipeIdx >= 0 && recipeIdx < d.recipes.length) {
      resp.status(200).send(d.recipes[recipeIdx]);
    } else {
      resp.status(400).send({
        error: { message: `invalid index ${req.params.index} in request` },
      });
    }
  });
};

const getRecipesByYield = (req, resp) => {
  let y = req.params.yield;
  y = parseInt(req.params.yield, 10);
  if (isNaN(y)) {
    resp.status(400).send({
      error: { message: `invalid yield ${req.params.yield} in request` },
    });
    return;
  }

  read(FILENAME, (err, d) => {
    if (err) {
      resp.status(500).send({ error: { message: `json read error - ${err}` } });
      return;
    }

    if (y >= 0) {
      const res = d.recipes.filter((e) => e.yield === y);
      resp.status(200).send(res);
    }
  });
};

const getRecipesByLabel = (req, resp) => {
  const label = req.params.label;
  const l = label.replace(/-/g, " "); // cannot use replaceAll ES12?

  read(FILENAME, (err, d) => {
    if (err) {
      resp.status(500).send({ error: { message: `json read error - ${err}` } });
      return;
    }

    const res = d.recipes.filter((e) => e.label.toLowerCase() === l);
    resp.status(200).send(res);
  });
};

const loggerMiddleWare = (req, resp, next) => {
  console.log(`[DEBUG] request url: ${req.originalUrl}`);
  next();
};

const main = () => {
  // setup routers
  router.get("/recipe/:index", getRecipeByIndex);
  router.get("/yield/:yield", getRecipesByYield);
  router.get("/recipe-label/:label", getRecipesByLabel);

  app.use(loggerMiddleWare);
  app.use("/", router);
  app.listen(3004);
};

main();
