import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  joinedAt: { type: Date, required: true },
});

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  captain: { type: String, required: true },
  members: { type: [String], required: true },
});

const activitySchema = new mongoose.Schema({
  username: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  points: { type: Number, required: true },
  date: { type: Date, required: true },
});

const leaderboardSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  points: { type: Number, required: true },
  rank: { type: Number, required: true },
});

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  level: { type: String, required: true },
  focus: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  exercises: { type: [String], required: true },
});

const User = mongoose.model('User', userSchema);
const Team = mongoose.model('Team', teamSchema);
const Activity = mongoose.model('Activity', activitySchema);
const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
const Workout = mongoose.model('Workout', workoutSchema);

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await User.insertMany([
      { username: 'alex', name: 'Alex Rivera', email: 'alex@mergington.edu', joinedAt: new Date('2026-01-10') },
      { username: 'jordan', name: 'Jordan Lee', email: 'jordan@mergington.edu', joinedAt: new Date('2026-01-12') },
      { username: 'sam', name: 'Sam Patel', email: 'sam@mergington.edu', joinedAt: new Date('2026-01-15') },
    ]);

    await Team.insertMany([
      { name: 'Peak Performers', captain: 'alex', members: ['alex', 'jordan'] },
      { name: 'Trail Blazers', captain: 'sam', members: ['sam'] },
    ]);

    await Activity.insertMany([
      { username: 'alex', type: 'Running', durationMinutes: 30, points: 30, date: new Date('2026-09-07') },
      { username: 'jordan', type: 'Strength training', durationMinutes: 25, points: 25, date: new Date('2026-09-07') },
      { username: 'sam', type: 'Walking', durationMinutes: 40, points: 20, date: new Date('2026-09-08') },
    ]);

    await Leaderboard.insertMany([
      { username: 'alex', points: 320, rank: 1 },
      { username: 'jordan', points: 285, rank: 2 },
      { username: 'sam', points: 240, rank: 3 },
    ]);

    await Workout.insertMany([
      { title: 'Starter Circuit', level: 'Beginner', focus: 'Full body', durationMinutes: 20, exercises: ['Bodyweight squats', 'Incline push-ups', 'Plank'] },
      { title: 'Cardio Builder', level: 'Intermediate', focus: 'Endurance', durationMinutes: 30, exercises: ['Jogging', 'High knees', 'Mountain climbers'] },
      { title: 'Strength Session', level: 'Advanced', focus: 'Strength', durationMinutes: 35, exercises: ['Lunges', 'Push-ups', 'Single-leg deadlift'] },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
