const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: Boolean
});

module.exports = mongoose.model('Task', taskSchema); 
