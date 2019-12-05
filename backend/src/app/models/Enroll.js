/* eslint-disable import/no-cycle */
import Sequelize, { Model } from 'sequelize';
import Student from './Student';
import Plan from './Plan';

class Enroll extends Model {
  static init(sequelize) {
    super.init(
      {
        startDate: Sequelize.DATE,
        studentId: {
          type: Sequelize.INTEGER,
          references: {
            model: Student,
            key: 'id',
          },
        },
        planId: {
          type: Sequelize.INTEGER,
          references: {
            model: Plan,
            key: 'id',
          },
        },
        endDate: Sequelize.DATE,
        price: Sequelize.DECIMAL,
      },
      {
        sequelize,
        tableName: 'enrollment',
      }
    );

    return this;
  }

  static associate() {
    this.belongsTo(Plan, {
      as: 'plan',
      foreignKey: 'planId',
    });
  }
}

export default Enroll;
