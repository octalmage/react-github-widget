const fs = require('fs');
const path = require('path');

const FetchGithubRepo = repo => new Promise((resolve, reject) => {
  if (repo === 'rate/limited') {
    reject(new Error('Rate Limited!'));
    return;
  }

  fs.readFile(path.join(__dirname, '__mockData__', `${repo}.json`), 'utf8', (err, data) => {
    if (err) reject(err);
    // Parse the data as JSON and put in the key entity (just like the request library does)
    resolve(JSON.parse(data));
  });
});

export default FetchGithubRepo;
