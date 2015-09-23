# mysql-as-promised [![Build Status](https://travis-ci.org/object-layer/mysql-as-promised.svg?branch=master)](https://travis-ci.org/object-layer/mysql-as-promised)

Yet another [mysql](https://www.npmjs.com/package/mysql) wrapper using promises.

### Why yet another?

Because every wrappers I found do things that I don't want:

- I don't want a dependency with a promise library (or  [native-or-bluebird](https://www.npmjs.com/package/native-or-bluebird)). ES6 is there now, and if it isn't, there are [polyfills](https://www.npmjs.com/package/core-js).
- I don't want a different API than the original [mysql](https://www.npmjs.com/package/mysql) module. I just want the same API with promises.

## Installation

```
npm install --save mysql-as-promised
```

## Usage

```javascript
import mysql from 'mysql-as-promised';

let pool = mysql.createPool('mysql://test@localhost/test');
let connection = await pool.getConnection();
let rows = await connection.query('SELECT ? + ? AS solution', [2, 3]);
console.log(rows[0].solution); // => 5
connection.release();
await pool.end();
```

## To do

- Complete the API (I implemented only what I needed).

## License

MIT
