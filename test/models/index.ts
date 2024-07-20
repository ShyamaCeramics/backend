'use strict';

import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';

const basename = path.basename(__filename);
const env: string = 'development';
const config: any = require(__dirname + '/../config/config.json')[env];
const db: any = {};

let sequelize: any = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file: string) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName: string) => {
  if ((db[modelName] as any).associate) {
    (db[modelName])(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export = db;
