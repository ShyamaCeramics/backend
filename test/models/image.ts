'use strict';
import { DataTypes } from 'sequelize';
import db from '.';

const Image = db.sequelize.define('Image', {
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.BLOB("long")
  }
});

export default Image;
