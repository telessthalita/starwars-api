require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Encerra o processo com falha
    });

const Film = mongoose.model('Film', {
    title: String,
    description: String,
    image_url: String,
    trailer_url: String
});

app.get("/", async (req, res) => {
    const films = await Film.find();
    return res.send(films);
});

app.delete("/:id", async (req, res) => {
    const film = await Film.findByIdAndDelete(req.params.id);
    res.send(film);
});

app.put("/:id", async (req, res) => {
    const film = await Film.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.send(film);
});

app.post("/", async (req, res) => {
    const film = new Film(req.body);
    await film.save();
    return res.send(film);
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
