import config from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import database from './server/src/models';
import UserRoute from './server/routes/user.route';

config.config();

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const PORT = process.env.PORT || 5000;


// when a random route is inputed
app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to this API.',
}));

app.use('/api', UserRoute);

database.sequelize.sync({
    force: true
}).then(() => {
    initial();
    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
    });
})


function initial() {
    database.Role.create({
        id: 1,
        name: "USER"
    });

    database.Role.create({
        id: 2,
        name: "ADMIN"
    });

    database.Role.create({
        id: 3,
        name: "PM"
    });
}

export default app;
