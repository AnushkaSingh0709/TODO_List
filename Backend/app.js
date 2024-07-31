const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const todosRoutes = require('./routes/todosRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend')));

// API routes
app.use('/api/todos', todosRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
