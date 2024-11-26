const express = require('express');
const router = express.Router();
const Workout = require('../models/workout'); // Import the Workout model

// GET all workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find(); // Fetch workouts from database
    console.log(workouts);  // Log the workouts to ensure notes are included
    res.render('index', { workouts }); // Pass workouts to the view
  } catch (err) {
    res.status(500).send("Error fetching workouts");
  }
});


// POST a new workout
router.post('/', async (req, res) => {
  console.log(req.body.notes);  // This will log the notes from the form
  const workout = new Workout({
    name: req.body.name,
    duration: req.body.duration,
    caloriesBurned: req.body.caloriesBurned,
    date: req.body.date,
    type: req.body.type,
    intensity: req.body.intensity,
    muscleGroups: req.body.muscleGroups || [],  // Use empty array if undefined
    equipmentUsed: req.body.equipmentUsed || [], // Use empty array if undefined
    notes: req.body.notes || ''
  });

  try {
    const newWorkout = await workout.save();
    res.redirect('/workouts');  // Redirect to the workouts page after saving
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a workout by ID
router.delete('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    await workout.delete1(); // Delete the workout document
    

    res.redirect('/workouts');  // Redirect back to the workouts page after deletion
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT (Update) a workout by ID
router.put('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    // Update workout with new values from the form
    // Update workout with new values from the form
workout.name = req.body.name;
workout.duration = req.body.duration;
workout.caloriesBurned = req.body.caloriesBurned;
workout.type = req.body.type;
workout.intensity = req.body.intensity;
workout.muscleGroups = req.body.muscleGroups;  // Assign directly
workout.equipmentUsed = req.body.equipmentUsed;  // Assign directly
workout.notes = req.body.notes;


    await workout.save();  // Save the updated workout

    res.redirect('/workouts');  // Redirect back to the workouts page after updating
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});





module.exports = router;
