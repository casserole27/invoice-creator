const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Import routes
const itemsRouter = require('./routes/items');

// Use route
app.use('/items', itemsRouter);

// Root route
app.get('/', (req, res) => {
    res.send('Time to make the donuts');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})