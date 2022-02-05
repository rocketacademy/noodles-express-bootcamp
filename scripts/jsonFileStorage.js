import { readFileSync } from 'fs';

export const filename = './public/data.json';

export const readFile = (filepath, encoding) => {
  const f = readFileSync(filepath, encoding);
  return JSON.parse(f);
};
