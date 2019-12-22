import { Router } from 'express';
import loginValidator from './app/validators/SessionLoginValidator';
import sessionController from './app/controllers/SessionController';
import authorization from './app/middlewares/AuthorizationMiddleware';
import StudentValidator from './app/validators/StudentValidator';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import PlanValidator from './app/validators/PlanValidator';
import RegistrationController from './app/controllers/RegistrationController';
import enrollValidator from './app/validators/enrollValidator';
import CheckinController from './app/controllers/CheckinController';
import studentExistsValidator from './app/validators/studentExistsValidator';
import StudentHelpOrdersController from './app/controllers/StudentHelpOrdersController';
import helpOrdersStudentValidator from './app/validators/helpOrdersStudentValidator';
import helpOrdersValidator from './app/validators/helpOrdersValidator';
import HelpOrderController from './app/controllers/HelpOrderController';

const routes = new Router();

routes.post('/login', loginValidator, sessionController.store);

/**
 * checkins
 *  */

routes.get(
  '/students/:studentId/checkins',
  studentExistsValidator,
  CheckinController.index
);
routes.post(
  '/students/:studentId/checkins',
  studentExistsValidator,
  CheckinController.store
);

/**
 * help-order-student
 *  */
routes.post(
  '/students/:studentId/help-orders',
  studentExistsValidator,
  helpOrdersStudentValidator,
  StudentHelpOrdersController.store
);
routes.get(
  '/students/:studentId/help-orders',
  studentExistsValidator,
  StudentHelpOrdersController.index
);

/**
 * routes below need authentication
 */
routes.use(authorization);
routes.get('/', (req, res) => res.json({ message: 'Hello' }));

// students
routes.post('/students', StudentValidator, StudentController.store);
routes.put('/students/:id', StudentValidator, StudentController.update);
routes.get('/students', StudentController.index);
routes.delete('/students/:id', StudentController.delete);

// plans
routes.get('/plans', PlanController.index);
routes.post('/plans', PlanValidator, PlanController.store);
routes.put('/plans/:id', PlanValidator, PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

// registration
routes.get('/registrations', RegistrationController.index);
routes.post('/registrations', enrollValidator, RegistrationController.store);
routes.put(
  '/registrations/:id',
  enrollValidator,
  RegistrationController.update
);
routes.delete('/registrations/:id', RegistrationController.delete);

// help orders
routes.get('/help-orders', HelpOrderController.index);
routes.post('/help-orders/:id', helpOrdersValidator, HelpOrderController.store);

export default routes;
