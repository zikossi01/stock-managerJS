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
    const task = new Task({ title, description, completed: false });
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

// Mettre à jour le statut d'une tâche
router.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (completed === undefined) {
    return res.status(400).json({ message: 'Le statut de complétion est requis.' });
  }

  try {
    const task = await Task.findByIdAndUpdate(id, { completed }, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée.' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche.' });
  }
});

// Supprimer une tâche
router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée.' });
    }
    res.status(200).json({ message: 'Tâche supprimée.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la tâche.' });
  }
});


module.exports = router;
