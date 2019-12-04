import { Router } from 'express';
import loginValidator from './app/validators/SessionLoginValidator';
import sessionController from './app/controllers/SessionController';
import authorization from './app/middlewares/AuthorizationMiddleware';
import StudentValidator from './app/validators/StudentValidator';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import PlanValidator from './app/validators/PlanValidator';
import EnrollController from './app/controllers/EnrollController';
import enrollValidator from './app/validators/enrollValidator';

const routes = new Router();

routes.post('/login', loginValidator, sessionController.store);

// routes below need authentication
routes.use(authorization);
routes.get('/', (req, res) => res.json({ message: 'Hello' }));

// students
routes.post('/students', StudentValidator, StudentController.store);
routes.put('/students/:id', StudentValidator, StudentController.update);

// plans
routes.get('/plans', PlanController.index);
routes.post('/plans', PlanValidator, PlanController.store);
routes.put('/plans/:id', PlanValidator, PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

// enrollment
routes.get('/enrollment', EnrollController.index);
routes.post('/enrollment', enrollValidator, EnrollController.store);
routes.put('/enrollment/:id', enrollValidator, EnrollController.update);
routes.delete('/enrollment/:id', EnrollController.delete);

// checkins
// routes.get('/student/:studentId/checkins')
// routes.post('/student/:studentId/checkins')

// help orders
// routes.get('/help-orders')
// routes.post('/students/:studentId/help-orders')
// routes.get('/students/:studentId/help-orders')
// routes.get('/help-orders/:id/answer')

export default routes;
