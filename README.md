
# NOTE

For more complete framework, maybe you want to use [Krakenjs](http://krakenjs.com/). It has more features (security, build process).

# Nodejs web app

A [https://nodejs.org/](https://nodejs.org/) web app base template

* [Express 4.x](http://expressjs.com/)
* [PostgreSQL](https://github.com/brianc/node-postgres) using [promise version](https://github.com/vitaly-t/pg-promise). Make sure to create those tables first!
* [Swig](http://paularmstrong.github.io/swig/). Its not maintained now, [see here](https://github.com/paularmstrong/swig/issues/628)
* [Bluebird](bluebirdjs.com). ES2015 Promises and Generator for async executions

## Promises

Strive to use promises everywhere, mostly for function that will be called in controllers.

Mixing promises and callbacks is a big anti-pattern, just think in promises and use [.asCallback](http://bluebirdjs.com/docs/api/ascallback.html) handle the mapping to callback equivalent at the end.

# How to use

* Fork or/and clone
* `$ npm install`
* `$ bower install`
* Setup [postgres](docs/working-with-postgres.md)
* `$ npm start` or `$ ./start`

# TODO

* Security
* Build tools (grunt or gulp)
* Change swig
* Tests and more tests
* ORM for PostgreSQL. Alternatives are [Bookshelf](http://bookshelfjs.org/), [Sequelize](http://docs.sequelizejs.com/en/latest/) and [rdb](https://github.com/alfateam/rdb)
* More Postgres example

# Style Guide

Use [jscs](http://jscs.info/) with [Airbnb](https://github.com/airbnb/javascript) preset as base. See [.jscsrc](.jscsrc). 

Follow guides on jscs on how to setup jscs. Optionally you might want to install jscs plugin on your favorite text editor.

# Contributions

Contributions are welcome