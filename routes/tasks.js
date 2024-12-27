const express = require('express');
const Task = require('../models/tasks');
const router = express.Router();

// Ajouter une tâche
router.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: 'Le titre et la description sont requis.' });
  }

  try {
    const task = new Task({ title, description });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la tâche.' });
  }
});
// Afficher toutes les tâches
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches.' });
  }
});



module.exports = router;
