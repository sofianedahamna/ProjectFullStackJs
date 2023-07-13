const { resolve } = require('path');
const { randomUUID } = require('crypto');

// DECLARATIONS
const { todos,user } = require('../db/data.json');
const { writeFileSync } = require('fs');

exports.homeCtrl = (req, res) => {
  console.log(`homectrl`);
  res.sendFile( resolve('public', 'home.html') );
};

      
function updateJSON() {
    writeFileSync(
      resolve('db', 'data.json'),
      JSON.stringify({ todos,user }, null, 2)
    );
  }