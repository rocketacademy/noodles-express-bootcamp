import express from "express"
import { filename, readFile } from "./jsonFileStorage.js"

const app = express()
const router = express.Router()

const getRecipeByIndex = (req, resp) => {
  const recipeIdx = parseInt(req.params.index, 10);

  const d = readFile(filename, 'utf-8');
  
  if (recipeIdx >= 0 && recipeIdx < d.recipes.length ){
    resp.status(200).send(d.recipes[recipeIdx])
  } else {
    resp.status(400).send({'error': {'message': `invalid index ${recipeIdx} in request`}})
  }
}


const loggerMiddleWare = (req, resp, next)=> {
  console.log(`[DEBUG] request url: ${req.originalUrl}`)
  next();
}


const main = () => {
  // setup routers
  router.get('/recipes/:index', getRecipeByIndex)

  app.use('/', router);
  app.use(loggerMiddleWare)
  app.listen(3004);
}

main()