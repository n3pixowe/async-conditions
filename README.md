# async-conditions

Asynchronous Conditions is for parallel check multiple datas with multiple conditions.

## Tutorial

Download `async-conditions` package to your project with npm command,

```
npm install async-conditions@latest
```

Include `async-conditions` into your object with `require('async-conditions')` function.

```javascript
const Validator = require('async-conditions');
```

Create an empty array for your check list.

```javascript
let checkList = [];
```

Add your checks one by one to your check list with `Validator.checkCondition(<condition>, <reference object>, <message>, <by object>, <error code>)` method. In the below code, we will add 3 checks for same object,

```javascript
let myObject = [10, 11, 12];
checkList.push(Validator.checkCondition("typeof(reference) ===  \"object\" && reference instanceof Array", myObject, "The object is not an array!", myObject, 0x1));
checkList.push(Validator.checkCondition("reference.length > 0", myObject, "This array is empty!", myObject, 0x2));
checkList.push(Validator.checkCondition("reference[0] === 10", myObject, "This array\'s first element is not 10!", myObject[0], 0x3));
```

**NOTE:** In the above code, we used `"reference.length > 0"` as a String. Here, `reference` is pointing to our `<reference object>` parameter.

**NOTE:** In the third `checkList.push(...)` call, we did used `myObject[0]` as `<by>` parameter, because the error is throwed by this data.

And the end! We will now use `Validator.checkConditions(<check list>)` asynchronous call to parallel validate our check list.

```javascript
Validator.checkConditions(checkList)
    .then(function(result) {
        if(result) {
            console.log("All checks succeeded...");
        }
    })
    .catch(function(error) {
        console.log(error);
    });

// Output: All checks succeeded...
```

If, any of our checks did failed, the `.catch()` call of `Validator.checkConditions()` will catch the error throwing condition and `console.log()` the error.

All the conditions are checked paralelly. If there was an failed check while checking all conditions, it will catched fastly before all the conditions give result. So, this is awesome to use while you are using synchronous `if...else if...else` or `switch case` expressions. If your checks has going to use a little bit time, you need to use asynchronous calls!

## Documentation

* async-validator
  * Class: AsyncValidator
    * [AsyncValidator.checkCondition(condition[, reference], message[, by, code])](https://github.com/n3pixowe/async-conditions#asyncvalidatorcheckconditioncondition-reference-message-by-code)
    * [AsyncValidator.generateErrorObject(message[, by, code])](https://github.com/n3pixowe/async-conditions#asyncvalidatorgenerateerrorobjectmessage-by-code)
    * [AsyncValidator.validateResults(checks)](https://github.com/n3pixowe/async-conditions#asyncvalidatorvalidateresultschecks)

### Class: AsyncValidator

#### AsyncValidator.checkCondition(condition[, reference], message[, by, code])

Added in: 0.0.1

**Type**

Asynchronous Function

**Parameters**

* `condition` *type:String*
* `reference` *type:any*, *default:null*
* `message` *type:String*
* `by` *type:any*, *default:null*
* `code` *type:Number*, *default:-1*

**Returns**

*Promise*, if `resolve` the conditions returns `false` (*because of no error*), if `reject` the condition returns `Error` object

**Usage**

```javascript
let myString = "Hello, World!";
AsyncValidator.checkCondition('reference.includes("Hello")', myString, "The string doesn't includes \"Hello\"!", myString, 0x90)
    .then(function(failed) {
        if(!failed) {
            console.log("The string includes \"Hello\".");
        }
    })
    .catch(function(error) {
        console.log(error);
    });

// Output: The string includes "Hello"
```

If, the condition did fail,

```
AsyncValidator.checkCondition("5 < 3", null, "Five is not smaller than three")
    .then(function(failed) {
        if(!failed) {
            console.log("Five is smaller than three.);
        }
    })
    .catch(function(error) {
        console.log(error);
    });

/*
 * Output:
 * { Error: Five is not smaller than three!
 *     at Function.generateErrorObject (<location>:<line>:<column>)
 *     at Promise (<location>)
 *     .
 *     .
 *     .
 *     at Function.Module._load (<location>:<line>:<column>) by: null, code: -1 }
 */
```

#### AsyncValidator.generateErrorObject(message[, by, code])

Added in: 0.0.1

**Type**

Function

**Parameters**

* `message` *type:String*
* `by` *type:any*, *default:null*
* `code` *type:Number*, *default:-1*

**Returns**

*Error Object* with properties `by` and `code`

**Usage**

```javascript
let myCustomErrorObject = AsyncValidator.generateErrorObject("The array doesn't have three elements.", [1, 2], 390);
console.log(myCustomErrorObject);

/*
 * Output:
 * { Error: The array doesn't have three elements.
 *     at Function.generateErrorObject (<location>:<line>:<column>)
 *     at Promise (<location>)
 *     .
 *     .
 *     .
 *     at Function.Module._load (<location>:<line>:<column>) by: [1, 2], code: 390 }
 */
```

Creates a custom error.

#### AsyncValidator.validateResults(checks)

Added in: 0.0.1

**Type**

Asynchronous Function

**Parameters**

* `checks` *type:Object*

**Returns**

*Promise*, if `resolve` checks returns `true` (*because, all conditions succeed*), if `reject`, returns `Error` object

**Usage**

```javascript
let myObject = {
    name: "John",
    lastname: "DOE",
    age: 44
};
let checkList = [
    AsyncValidator.checkCondition("typeof(reference.name) === 'string' && typeof(reference.lastname) === 'string' && typeof(reference.age) === 'number'", myObject, "name, lastname and age properties are not valid.", myObject, 0x00)
    AsyncValidator.checkCondition("reference.age => 0", myObject, "age property is not valid.", myObject.age, 0x01)
]
AsyncValidator.validateChecks(checkList)
    .then(function(success) {
        if(success) {
            console.log("Conditions are fit!");
        }
    })
    .catch(function(error) {
        console.log(error);
    });

// Output: Conditions are fit!
```

Checks all `AsyncValidator.checkCondition()` in an array asynchronously. All checks starts at the same time, if any of conditions return `Error` object, the process fails and shows the `Error` object.

## **If you got any problems, tell us!**