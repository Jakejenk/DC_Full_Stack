'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ride extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Ride.init({
    user_name: DataTypes.STRING,
    date_of_ride: DataTypes.DATEONLY,
    distance: DataTypes.INTEGER,
    location_of_ride: DataTypes.STRING,
    difficulty_level: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ride',
  });
  return Ride;
};