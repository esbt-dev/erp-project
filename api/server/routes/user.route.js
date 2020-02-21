import {
    Router
} from 'express';
import verifySignup from '../middlewares/verifySignup';
import UserController from '../controllers/user.controller';

const router = Router();

router.get('/user', UserController.getAllUsers);
router.post('/admin', [verifySignup.duplicateUser, verifySignup.checkRoleExisted], UserController.createAdmin);

export default router;
