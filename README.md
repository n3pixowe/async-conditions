# async-conditions

Asynchronous Conditions is for parallel check multiple datas with multiple conditions.

### Tutorial

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
checkList.push(Validator.checkCondition('typeof(reference) ===  \'object\' && reference instanceof Array', myObject, 'The object is not an array!', myObject, 0x1));
checkList.push(Validator.checkCondition('reference.length > 0', myObject, 'This array is empty!', myObject, 0x2));
checkList.push(Validator.checkCondition('reference[0] === 10', myObject, 'This array\'s first element is not 10!', myObject[0], 0x3));
```

**NOTE:** In the above code, we used `'reference.length > 0'` as a String. Here, `reference` is pointing to our `<reference object>` parameter.

**NOTE:** In the third `checkList.push(...)` call, we did used `myObject[0]` as `<by>` parameter, because the error is throwed by this data.

And the end! We will now use `Validator.checkConditions(<check list>)` asynchronous call to parallel validate our check list.

```javascript
Validator.checkConditions(checkList)
    .then(function(result) {
        if(result) {
            console.log('All checks succeeded...');
        }
    })
    .catch(function(error) {
        console.log(error);
    });

// Output: All checks succeeded...
```

If, any of our checks did failed, the `.catch()` call of `Validator.checkConditions()` will catch the error throwing condition and `console.log()` the error.

All the conditions are checked paralelly. If there was an failed check while checking all conditions, it will catched fastly before all the conditions give result. So, this is awesome to use while you are using synchronous `if...else if...else` or `switch case` expressions. If your checks has going to use a little bit time, you need to use asynchronous calls!