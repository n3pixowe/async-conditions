const Validator = require('./../index');

let checks = [
    Validator.checkCondition('reference.length > 2 && reference.length < 5', [1, 2, 3, 4, 5, 6, 7], 'Eleman Sayısı 2\'then büyük değildir.', [1, 2, 3, 4, 5, 6, 7], 4),
    Validator.checkCondition('reference.length > 3', [1, 2, 3, 4, 5, 6, 7], 'Eleman Sayısı 3\'then büyük değildir.', [1, 2, 3, 4, 5, 6, 7], 3),
    Validator.checkCondition('reference.length > 4', [1, 2, 3, 4, 5, 6, 7], 'Eleman Sayısı 4\'then büyük değildir.', [1, 2, 3, 4, 5, 6, 7], 2),
    Validator.checkCondition('reference.length > 5', [1, 2, 3, 4, 5, 6, 7], 'Eleman Sayısı 5\'then büyük değildir.', [1, 2, 3, 4, 5, 6, 7], 1)
];

Validator.validateResults(checks)
    .then(result => {
        if(result === true)
            console.log('All conditions skipped!');
    })
    .catch(error => {
        console.log(error);
    });