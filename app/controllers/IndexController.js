'use strict';

const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));

function getContent(article) {
    return new Promise(function(resolve, reject) {
        request.getAsync(article.url).then(function(result) {
            article.content = result.body.substring(0, 200);
            article.processed = true;
            resolve(article);
        }).catch(reject);
    });
}

function processJson(jsonArr) {
    return Promise.map(jsonArr, function(article) {
        return getContent(article);
    });
}

function getJson() {
    return new Promise(function(resolve, reject) {
        try {
            resolve(JSON.parse('[{"title":"JavaScript Promises ... In Wicked Detail","author":"Matt Greer","url":"http://www.mattgreer.org/articles/promises-in-wicked-detail/"},{"title":"Promises in AngularJS, Explained as a Cartoon","author":"Andy Shora","url":"http://andyshora.com/promises-angularjs-explained-as-cartoon.html"},{"title":"We have a problem with promises","author":"Nolan Lawson","url":"http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html"}]'));
        } catch (err) {
            reject(err);
        }
    });
}

function getErrJson() {
    return new Promise(function(resolve, reject) {
        try {
            resolve(JSON.parse('[{"title:"JavaScript Promises ... In Wicked Detail","author":"Matt Greer","url":"http://www.mattgreer.org/articles/promises-in-wicked-detail/"},{"title":"Promises in AngularJS, Explained as a Cartoon","author":"Andy Shora","url":"http://andyshora.com/promises-angularjs-explained-as-cartoon.html"},{"title":"We have a problem with promises","author":"Nolan Lawson","url":"http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html"}]'));
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {

    index(req, res, next) {
        const model = res.model;
        model.errors = req.flash('error');
        res.render('index', model);
    },

    articles: Async.route(function *(req, res, next) {
        const json = yield getJson();
        const processed = yield processJson(json);
        res.send(processed);
    }),

    articlesErr: Async.route(function *(req, res, next) {
        const json = yield getErrJson();
        const processed = yield processJson(json);
        res.send(processed);
    }),

};

