import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  joinedAt: Date,
})

const teamSchema = new mongoose.Schema({
  name: String,
  captain: String,
  members: [String],
})

const activitySchema = new mongoose.Schema({
  username: String,
  type: String,
  durationMinutes: Number,
  points: Number,
  date: Date,
})

const leaderboardSchema = new mongoose.Schema({
  username: String,
  points: Number,
  rank: Number,
})

const workoutSchema = new mongoose.Schema({
  title: String,
  level: String,
  focus: String,
  durationMinutes: Number,
  exercises: [String],
})

export const User = mongoose.model('User', userSchema)
export const Team = mongoose.model('Team', teamSchema)
export const Activity = mongoose.model('Activity', activitySchema)
export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema)
export const Workout = mongoose.model('Workout', workoutSchema)
