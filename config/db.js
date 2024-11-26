const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://aaronbrittanniaray:Babyray18@cluster0.f816t.mongodb.net/workoutTracker?retryWrites=true&w=majority');
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
