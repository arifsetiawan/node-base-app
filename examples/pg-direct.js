
const Async = require('../app/services/Async');
const config = require('../config/dev.local');

const promise = require('bluebird');
const options = {
    promiseLib: promise,
};
const pgp = require('pg-promise')(options);

const db = pgp(config.postgres);

(Async.make(function*() {
    try {

        var schema = yield db.query('CREATE SCHEMA IF NOT EXISTS direct AUTHORIZATION app');
        var table = yield db.query('CREATE TABLE IF NOT EXISTS direct.user (id bigserial PRIMARY KEY, username text NOT NULL UNIQUE, fullname text NOT NULL, email text NOT NULL UNIQUE, password text, role text[], status text)');

        var schema = yield db.query('ALTER TABLE direct.user OWNER TO app');
        var schema = yield db.query('ALTER TABLE direct.user_id_seq OWNER TO app');

        // insert user here
        var user = yield db.one('INSERT INTO direct.user(username, fullname, email, password, role, status) values($1, $2, $3, $4, $5, $6) returning *', ['Jane', 'John Wick', 'jane@email.com', 'pass', '{"user", "admin"}', 'active']);
        console.log(user);

        // query users
        var users = yield db.query('SELECT * FROM direct.user WHERE status=$1', 'active');
        console.log(users);
    }
    catch (ex) {
        console.error('error', ex);
    }
    finally {
        process.exit();
    }
}))();

process.on('unhandledRejection', function(reason, p) {
    console.log('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});
