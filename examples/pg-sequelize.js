
const Async = require('../app/services/Async');
const config = require('../config/dev.local');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.postgres.connectionUri);

// var table = yield db.query('CREATE TABLE IF NOT EXISTS direct.user (id bigserial PRIMARY KEY, username text NOT NULL UNIQUE, fullname text NOT NULL, email text NOT NULL UNIQUE, password text NOT NULL, role text[], status text DEFAULT "init")');

var User = sequelize.define('User', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
    },
    fullname: {
        type:Sequelize.TEXT,
        allowNull: false,
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    role: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: true,
        defaultValue: ['user'],
    },
    status: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: 'init',
    }, },
    {
        tableName:'user',
        schema: 'sequelize',
    }
);

(Async.make(function*() {
    try {

        // error if schema exists
        var schema = yield sequelize.createSchema('sequelize', {logging:console.log});
        var sync = yield sequelize.sync({force: false}, {logging:console.log});

        var user = yield User.create({
            username: 'john',
            fullname: 'John Doe',
            email: 'john@email.com',
            password: 'pass',
            role: ['user'],
        });

        // sequelize will return instance object. to get only data user get method
        console.log(user.get({plain: true}));

        var users = yield User.findAll();

        // use stringify then parse to get only json data from array
        console.log(JSON.parse(JSON.stringify(users)));
    }
    catch (ex) {
        console.error('error', ex);
    }
    finally {
        process.exit();
    }
}))();
