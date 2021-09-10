'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./users/users.js');
const clothesModel = require('./clothes/model.js');
const foodModel = require('./food/model.js');
const Collection = require('./data-collection.js');

const DATABASE_URL = process.env.DATABASE_URL;

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
  // this is about Heroku and ensuring SSL is enabled
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
  // otherwise, we don't need any dialect options - it will default to {} standard
} : {};

const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
  food: new Collection(food),
  clothes: new Collection(clothes),
}