const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: Number,
    required: true
  },
  caloriesBurned: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['Cardio', 'Strength', 'Flexibility', 'Balance', 'Other'],
    required: true
  },
  intensity: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  },
  muscleGroups: {
    type: [String], // An array of strings to hold multiple muscle groups
    default: []
  },
  equipmentUsed: {
    type: [String], // An array of strings for equipment 
    default: []
  },
  notes: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('Workout', WorkoutSchema);

