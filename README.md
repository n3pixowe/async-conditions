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

Add your checks one by one to your check list with `Validator.checkCondition(<condition>, <reference object>, <message>, <by object>, <error code>)` method. In the above code, we will add 3 checks for same object,

```javascript
let myObject = [10, 11, 12];
checkList.push(Validator.checkCondition('typeof(reference) ===  \'object\' && reference instanceof Array', myObject, 'The object is not an array!', myObject, 0x1));
checkList.push(Validator.checkCondition('reference.length > 0', myObject, 'This array is empty!', myObject, 0x2));
checkList.push(Validator.checkCondition('reference[0] === 10', myObject, 'This array\'s first element is not 10!', myObject[0], 0x3));
```