/* eslint-disable import/no-cycle */
import Sequelize, { Model } from 'sequelize';
import Enroll from './Enroll';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate() {
    this.hasMany(Enroll, {
      as: 'enroll',
      foreignKey: 'planId',
    });
  }
}

export default Plan;
