
# NOTE

For more complete framework, maybe you want to use [Krakenjs](http://krakenjs.com/). It has more features (security, build process).

# Nodejs web app

A [https://nodejs.org/](https://nodejs.org/) web app base template

* [Express 4.x](http://expressjs.com/)
* [Postgres promise](https://github.com/vitaly-t/pg-promise) or ORM (see Working with Postgres section below)
* [Swig](http://paularmstrong.github.io/swig/). Its not maintained now, [see here](https://github.com/paularmstrong/swig/issues/628)
* [Bluebird](bluebirdjs.com). ES2015 Promises and Generator for async executions

## Promises

Strive to use promises everywhere, mostly for function that will be called in controllers.

Mixing promises and callbacks is a big anti-pattern, just think in promises and use [.asCallback](http://bluebirdjs.com/docs/api/ascallback.html) handle the mapping to callback equivalent at the end. Some libraries like Passport is not using Promises yet, so we will need to use callback to return. 

See [Thinking in promises](docs/thinking-in-promises.md)

# How to use

* Fork or/and clone
* `$ npm install`
* `$ bower install`
* Setup [postgres](docs/working-with-postgres.md)
* `$ npm start` or `$ ./start`

# Working with Postgres

We can use direct SQL syntax using [Postgres promise](https://github.com/vitaly-t/pg-promise) or ORM. There are several alternatives for ORM: [Bookshelf](http://bookshelfjs.org/), [Sequelize](http://docs.sequelizejs.com/en/latest/), [rdb](https://github.com/alfateam/rdb), [Objection](https://github.com/Vincit/objection.js), [Knex](https://github.com/tgriesser/knex).

Some examples:

* [SQL directly](examples/pg-direct.js)
* [Sequelize](examples/pg-sequelize.js)
* More is coming

# TODO

* Security
* Build tools (grunt or gulp)
* Change swig
* Tests and more tests

# Style Guide

Use [jscs](http://jscs.info/) with [Airbnb](https://github.com/airbnb/javascript) preset as base. See [.jscsrc](.jscsrc). 

Follow guides on jscs on how to setup jscs. Optionally you might want to install jscs plugin on your favorite text editor.

# Contributions

Contributions are welcome
