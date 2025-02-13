const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./secrets.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://<YOUR_PROJECT_ID>.firebaseio.com"
});

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: name,
        });
        res.status(201).send(userRecord);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});