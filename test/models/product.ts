'use strict';
import { DataTypes } from 'sequelize';
import db from ".";

const Product = db.sequelize.define('Product', {
  sku: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false
  },
  height: {
    type: DataTypes.INTEGER,
    defaultValue: 0 // Change default value as per your requirement
  },
  dia: {
    type: DataTypes.INTEGER,
    defaultValue: 0 // Change default value as per your requirement
  },
  price: {
    type: DataTypes.INTEGER,
    defaultValue: 0 // Change default value as per your requirement
  },
  category: {
    type: DataTypes.STRING, // Changed to STRING as per original model
    allowNull: false // Assuming category cannot be null
  },
  images: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Product;
