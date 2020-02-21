import database from '../src/models';
import Util from '../utils/utils';
import ROLE from '../src/config/role';

const ROLEs = ROLE.ROLEs;

const util = new Util();

const duplicateUser = async (req, res, next) => {
    const user = await database.User.findOne({
        where: {
            store_id: req.body.store_id,
            username: req.body.username
        }
    })

    if (user) {
        util.setError(400, 'User already existed.');
        return util.send(res);
    }
    next();
}

const checkRoleExisted = async (req, res, next) => {
    for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLEs.includes(req.body.roles[i].toUpperCase())) {
            util.setError(400, `Fail -> Does NOT exist Role = ${req.body.roles[i]}.`);
            return util.send(res);
        }
        next();
    }
}

const signupVerify = {};
signupVerify.duplicateUser = duplicateUser;
signupVerify.checkRoleExisted = checkRoleExisted
module.exports = signupVerify;

