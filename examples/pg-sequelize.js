
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


/*
// model definition
var Task = sequelize.define("Task", {
  name: Sequelize.STRING,
  deadline: Sequelize.DATE,
  importance: Sequelize.INTEGER
}, {
  classMethods: {
    setImportance: function(newImportance, callback) {
      Task.findAll().on('success', function(allTasks) {
        var chainer = new Sequelize.Utils.QueryChainer
        allTasks.forEach(function(task) {
          chainer.add(task.updateAttributes({ importance: newImportance }))
        })
        chainer.run().on('success', function() {
          callback && callback()
        })
      })
    }
  },
  instanceMethods: {
    passedDeadline: function() {
      return (this.deadline < new Date())
    }
  }
})

// instance creation
var task1 = Task.build({
      name: 'Choose a nice MySQL connector',
      deadline: new Date(Date.parse("Jul 8, 2100")),
      importance: 10
    }),
    task2 = Task.build({
      name: 'Build the rest',
      deadline: new Date(Date.parse("Jul 8, 2005")),
      importance: 90
    })

Task.sync({force: true}).on('success', function() {
  new Sequelize.Utils.QueryChainer([task1.save(), task2.save()]).run().on('success', function() {
    console.log("should be false: " + task1.passedDeadline())
    console.log("should be true: " + task2.passedDeadline())
    console.log("should be 10: " + task1.importance)

    Task.setImportance(30, function() {
      Task.findAll().on('success', function(tasks) {
        tasks.forEach(function(task) {
          console.log("should be 30: " + task.importance)
        })
      })
    })
  })
})
*/
