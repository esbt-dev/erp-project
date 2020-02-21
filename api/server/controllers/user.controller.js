import bcrypt from 'bcrypt';
import uuidv4 from 'uuid/v4';

import UserService from '../services/user.service';
import Util from '../utils/utils';
import database from '../src/models';

const Op = database.Sequelize.Op;
const util = new Util();

let saltRounds = 7;

class UserController {
    static async getAllUsers(req, res) {
        try {
            const allUsers = await UserService.getAllUsers();

            if (allUsers.length > 0) {
                util.setSuccess(200, 'Success', allUsers);
            } else {
                util.setSuccess(200, 'No User found');
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async createAdmin(req, res) {
        try {
            if (!req.body.store_name || !req.body.store_id || !req.body.username || !req.body.password) {
                util.setError(400, 'Miss content')
                return util.send(res)
            }
            let salt = bcrypt.genSaltSync(saltRounds);
            let store_id = req.body.store_id;
            let username = req.body.username;

            const userItems = {
                store_name: req.body.store_name,
                store_id: store_id,
                username: username,
                password: bcrypt.hashSync(req.body.password, salt),
                token: uuidv4()
            }

            const adminUser = await UserService.addUser(userItems);

            const roles = await database.Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            })

            await adminUser.setRoles(roles)
            console.log('______________________________');

            util.setSuccess(200, 'Success', adminUser);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default UserController;
