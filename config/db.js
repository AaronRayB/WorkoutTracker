const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use your MongoDB URI directly here (for testing purposes only)
    await mongoose.connect('mongodb+srv://aaronbrittanniaray:Babyray18@cluster0.f816t.mongodb.net/workoutTracker?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
