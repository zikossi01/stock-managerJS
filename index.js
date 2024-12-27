const express = require ('express');
const taskRoutes = require('./routes/tasks');
const mongoose = require('mongoose');

const dbURI = "mongodb://127.0.0.1:27017/tasks";
const port = 3000;

mongoose.connect(dbURI);

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
});

db.once('connected', () => {
    console.log('Database connected');
});

app = express();

app.use(express.json());
app.use('/api', taskRoutes);

app.listen(3000, () => {
    console.log("Server listening on " + port);
});
