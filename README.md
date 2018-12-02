# async-conditions

Asynchronous Conditions is for parallel check multiple datas with multiple conditions.

### Tutorial

Download `async-conditions` package to your project with npm command,

```
npm install async-conditions@latest
```

Include `async-conditions` into your object with `require('async-conditions')` function.

```
const Validator = require('async-conditions');
```

Create an empty array for your check list.

```
let checkList = [];
```

Add your checks one by one to your check list with ``