import express from 'express';
const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express.json());
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' });
});
app.get('/api/users/', (_request, response) => {
    response.json([]);
});
app.get('/api/teams/', (_request, response) => {
    response.json([]);
});
app.get('/api/activities/', (_request, response) => {
    response.json([]);
});
app.get('/api/leaderboard/', (_request, response) => {
    response.json([]);
});
app.get('/api/workouts/', (_request, response) => {
    response.json([]);
});
app.listen(port, () => {
    console.log(`OctoFit API listening at ${baseUrl}`);
});
