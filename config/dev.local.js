
var path = require('path');

module.exports = {

    port: process.env.PORT || 8000,
    hostname: 'localhost',
    get fullHostname() {
        return `${this.hostname}:${this.port}`;
    },

    // main database
    postgres: {
        host: 'localhost',
        port: 5432,
        database: 'baseapp',
        user: 'app',
        password: 'pass',
        get connectionUri() {
            return `postgres://${this.user}:${this.password}@${this.host}:${this.port}/${this.database}`;
        },
    },

    // dir
    appDir: path.join(__dirname, '..'),
    uploadDir: path.join(__dirname, '..', '/app/public/upload'),

    // locale
    i18n: {
        defaultLocale: 'en_US',
    },

    // swig
    swig: {
        cache: 'memory',
    },

    // nodemailer
    emailer: {
        service: 'emailService',
        user: 'username',
        pass: 'password',
    },

    cookie: {
        secret: 'thisisnotsecret',
    },
};
