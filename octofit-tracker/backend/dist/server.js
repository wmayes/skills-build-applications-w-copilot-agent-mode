import express from 'express';
import './config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from './models.js';
const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
const allowedOrigins = new Set([
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
]);
app.use(express.json());
app.use((request, response, next) => {
    const origin = request.headers.origin;
    if (origin && allowedOrigins.has(origin)) {
        response.setHeader('Access-Control-Allow-Origin', origin);
        response.setHeader('Vary', 'Origin');
        response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }
    if (request.method === 'OPTIONS') {
        response.sendStatus(204);
        return;
    }
    next();
});
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' });
});
app.get('/api/users/', async (_request, response) => {
    response.json(await User.find().sort({ joinedAt: 1 }).lean());
});
app.get('/api/teams/', async (_request, response) => {
    response.json(await Team.find().sort({ name: 1 }).lean());
});
app.get('/api/activities/', async (_request, response) => {
    response.json(await Activity.find().sort({ date: -1 }).lean());
});
app.get('/api/leaderboard/', async (_request, response) => {
    response.json(await Leaderboard.find().sort({ rank: 1 }).lean());
});
app.get('/api/workouts/', async (_request, response) => {
    response.json(await Workout.find().sort({ title: 1 }).lean());
});
app.listen(port, () => {
    console.log(`OctoFit API listening at ${baseUrl}`);
});
