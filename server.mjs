import express from 'express';
import { handler as astroHandler } from './dist/server/entry.mjs';

const app = express();
const PORT = 3000;

app.get('/api/people', (req, res) => {
    res.json([
        { name: "John", lastName: "Doe", address: "1234 Main St" },
        { name: "Jane", lastName: "Doe", address: "1235 Main St" },
        { name: "Jim", lastName: "Beam", address: "1236 Main St" }
    ]);
});
// Use Astro handler for all other routes
app.use(astroHandler);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});