const express = require('express');
const path = require('path');

const app = express();

// Serve static assets
app.use(express.static(path.resolve(__dirname, 'build')));

// Always return index.html, react-router takes control
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 9990;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
