const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');

// GET all workouts
router.get('/', async (req, res) => {
    try {
      const workouts = await Workout.find();
      console.log("Fetched workouts:");
      workouts.forEach(workout => {
        console.log("Workout name:", workout.name);
        console.log("Workout duration:", workout.duration);
        console.log("Calories burned:", workout.caloriesBurned);
      });
      res.render('index', { workouts });
    } catch (err) {
      res.status(500).send("Error findinf workouts");
    }
  });
  
  

// POST a new workout
router.post('/', async (req, res) => {
  const { name, duration, caloriesBurned } = req.body;
  await Workout.create({ name, duration, caloriesBurned });
  res.redirect('/workouts');
});

// DELETE a workout
router.delete('/:id', async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.redirect('/workouts');
  res.redirect('/');
});

// PUT (Update) a workout by ID
router.put('/:id', async (req, res) => {
    const { name, duration, caloriesBurned } = req.body;
    await Workout.findByIdAndUpdate(req.params.id, { name, duration, caloriesBurned });
    res.redirect('/workouts');
  });
  

module.exports = router;
