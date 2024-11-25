const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');

// GET all workouts
router.get('/', async (req, res) => {
    try {
      const workouts = await Workout.find(); // Fetch workouts from the database
      console.log(workouts);  
      res.render('index', { workouts }); // Pass workouts to the view
    } catch (err) {
      res.status(500).send("Error fetching workouts"); // Handle errors 
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
});

// PUT (Update) a workout by ID
router.put('/:id', async (req, res) => {
    const { name, duration, caloriesBurned } = req.body;
    await Workout.findByIdAndUpdate(req.params.id, { name, duration, caloriesBurned });
    res.redirect('/workouts');
  });
  

module.exports = router;
