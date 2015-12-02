# Thinking in promises and generators

### Callback

Call function, it does things. At some point in the future it will call callback at the end to exit the function and pass the result to caller

```
function func1(params, callback) {
    // do something
    // when done or have error
    return callback(err, result)
}
```

### Promise

Call function, it will return promise. At some point in the future promise might be resolved with result or rejected with error

```
function func1(params) {
    return new Promise(function(resolve, reject) {
        // do something
        // when done
        if (ok) {
            resolve(result)
        }
        // or have error
        else {
            reject(err)
        }
    }
    });
}
```