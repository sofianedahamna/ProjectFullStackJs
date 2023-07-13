const { readFileSync } = require('fs');
const { resolve } = require('path');

module.exports = {
  ports: {
    http: 80,
    https: 443,
  },
  ssl: {
    cert: readFileSync( resolve('ssl', 'default.crt')),
    key: readFileSync( resolve('ssl', 'default.key')),
  }
};