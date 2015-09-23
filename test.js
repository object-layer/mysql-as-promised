'use strict';

import { assert } from 'chai';
import mysql from './src';

describe('mysql-as-promised', function() {
  let pool;

  before(function() {
    pool = mysql.createPool('mysql://test@localhost/test');
  });

  it('should perform a simple operation', async function() {
    let connection = await pool.getConnection();
    let rows = await connection.query('SELECT ? + ? AS solution', [2, 3]);
    assert.strictEqual(rows[0].solution, 5);
    connection.release();
  });

  after(async function() {
    await pool.end();
  });
});
