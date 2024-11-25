require('dotenv').config();  // This loads environment variables from .env file

const express = require('express');
const connectDB = require('./config/db');
const Workout = require('./models/workout'); //  Workout model
const workoutsRouter = require('./routes/workouts'); //  workouts route
const methodOverride = require('method-override'); //  method-override


const app = express();

// Connect to MongoDB
connectDB();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files (for my style.css)
app.use(express.static('public'));

// Middleware to parse
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use method override to support DELETE and PUT methods from forms
app.use(methodOverride('_method')); // << Add this line

// Root route (Homepage) to render all workouts
app.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find(); // Fetch workouts from database
    res.render('index', { workouts }); // Pass workouts to the view
  } catch (error) {
    res.status(500).send("Error fetching workouts");
  }
});

// Use the workouts route for any routes under /workouts
app.use('/workouts', workoutsRouter);

const PORT = process.env.PORT || 16000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/public', async (req, res) => {
    try {
      const workouts = await Workout.find();  // Fetch all workouts from MongoDB
      res.render('public', { workouts });  // Render 'public.ejs'
    } catch (error) {
      res.status(500).send("Error fetching workouts");
    }
  });
  
