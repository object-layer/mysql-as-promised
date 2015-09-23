'use strict';

let mysql = require('mysql');

export let mysqlAsPromised = {
  createPool(options) {
    let pool = mysql.createPool(options);

    let poolAsPromised = {
      getConnection() {
        return new Promise(function(resolve, reject) {
          pool.getConnection(function(err, connection) {
            if (err) {
              reject(err);
              return;
            }

            let connectionAsPromised = {
              query(sql, values) {
                return new Promise(function(resolve, reject) {
                  connection.query(sql, values, function(err, res) {
                    if (err) reject(err); else resolve(res);
                  });
                });
              },

              format: mysql.format.bind(mysql),

              escape: mysql.escape.bind(mysql),

              escapeId: mysql.escapeId.bind(mysql),

              release: connection.release.bind(connection)
            };

            resolve(connectionAsPromised);
          });
        });
      },

      query(sql, values) {
        return new Promise(function(resolve, reject) {
          pool.query(sql, values, function(err, res) {
            if (err) reject(err); else resolve(res);
          });
        });
      },

      on: pool.on.bind(pool),

      format: mysql.format.bind(mysql),

      escape: mysql.escape.bind(mysql),

      escapeId: mysql.escapeId.bind(mysql),

      end() {
        return new Promise(function(resolve, reject) {
          pool.end(function(err, res) {
            if (err) reject(err); else resolve(res);
          });
        });
      }
    };

    return poolAsPromised;
  },

  format: mysql.format.bind(mysql),

  escape: mysql.escape.bind(mysql),

  escapeId: mysql.escapeId.bind(mysql)
};

export default mysqlAsPromised;
