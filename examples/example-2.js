const Validator = require("./../index");

Validator.checkCondition("5 < 3", null, "Five is not smaller than three!")
    .then(function(failed) {
        if(!failed) {
            console.log("File is smaller than three.");
        }
    })
    .catch(function(error) {
        console.log(error);
    });