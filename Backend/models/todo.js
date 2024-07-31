const connection = require('../config/db');

class Todo {
    static getAll(callback) {
        connection.query('SELECT * FROM todos', callback);
    }

    static getById(id, callback) {
        connection.query('SELECT * FROM todos WHERE id = ?', [id], callback);
    }

    static create(data, callback) {
        connection.query('INSERT INTO todos SET ?', data, callback);
    }

    // backend/models/Todo.js

static update(id, data, callback) {
    connection.query('UPDATE todos SET ? WHERE id = ?', [data, id], callback);
}


    static delete(id, callback) {
        connection.query('DELETE FROM todos WHERE id = ?', [id], callback);
    }
}

module.exports = Todo;
