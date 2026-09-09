import express from 'express';

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