'use strict';
import { DataTypes } from 'sequelize';
import db from '.';

const Order = db.sequelize.define('Order', {
  order_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  product_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

export default Order;
