'use strict';
import { DataTypes } from 'sequelize';
import db from '.';

const User = db.sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  }
});

export default User;
