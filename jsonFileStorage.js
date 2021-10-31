import { readFile } from 'fs';

// eslint-disable-next-line import/prefer-default-export
export function read(filename, callback) {
  const handleFileRead = (readErr, jsonContentStr) => {
    if (readErr) {
      console.error('Read error', readErr);
      // Allow client to handle error in their own way
      callback(readErr, null);
      return;
    }

    // Convert file content to JS Object
    const jsonContentObj = JSON.parse(jsonContentStr);

    // Call client callback on file content
    callback(null, jsonContentObj);
  };

  // Read content from DB
  readFile(filename, 'utf-8', handleFileRead);
}
