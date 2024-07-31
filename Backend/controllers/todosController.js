const Todo = require('../models/Todo');

exports.getTodos = (req, res) => {
    Todo.getAll((err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.getTodoById = (req, res) => {
    Todo.getById(req.params.id, (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
};

exports.createTodo = (req, res) => {
    const newTodo = req.body;
    Todo.create(newTodo, (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, ...newTodo });
    });
};

// backend/controllers/todosController.js

exports.updateTodo = (req, res) => {
    const updatedTodo = req.body;
    Todo.update(req.params.id, updatedTodo, (err, results) => {
        if (err) throw err;
        res.json({ id: req.params.id, ...updatedTodo });
    });
};


exports.deleteTodo = (req, res) => {
    Todo.delete(req.params.id, (err, results) => {
        if (err) throw err;
        res.json({ message: 'Todo deleted' });
    });
};
