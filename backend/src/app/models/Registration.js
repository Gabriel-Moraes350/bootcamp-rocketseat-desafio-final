/* eslint-disable import/no-cycle */
import Sequelize, { Model } from 'sequelize';
import { isBefore, isAfter } from 'date-fns';
import Student from './Student';
import Plan from './Plan';

class Registration extends Model {
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
        active: {
          type: Sequelize.VIRTUAL(Sequelize.BOOLEAN, ['startDate', 'endDate']),
          get() {
            return (
              isBefore(this.get('startDate'), new Date()) &&
              isAfter(this.get('endDate'), new Date())
            );
          },
        },
      },
      {
        sequelize,
        tableName: 'registrations',
      }
    );

    return this;
  }

  static associate() {
    this.belongsTo(Plan, {
      as: 'plan',
      foreignKey: 'planId',
    });

    this.belongsTo(Student, {
      as: 'student',
      foreignKey: 'studentId',
    });
  }
}

export default Registration;
