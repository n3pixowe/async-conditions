class AsyncValidator {
    constructor(options) {
        this.options = options;
    }

    static generateErrorObject(message, by=null, code=-1) {
        let error = new Error(message);
        error.by = by;
        error.code = code;
        return error;
    }

    static checkCondition(condition, reference=null, message, by=null, code=-1) {
        return new Promise((resolve, reject) => {
            if(eval(condition)) {
                resolve(false);
            } else {
                reject(this.generateErrorObject(message, by, code));
            }
        });
    }

    static validateResults(checks) {
        return new Promise((resolve, reject) => {
            Promise.all(checks)
                .then(validityErrors => {
                    for(let validityError of validityErrors) {
                        if(validityError)
                            reject(validityError);
                    }
                    resolve(true);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

module.exports = AsyncValidator;