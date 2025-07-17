const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');



dotenv.config(); // Load .env file
connectDB();     // Connect to MongoDB

const app = express();
app.use(express.json()); // Parse JSON data

app.get('/', (req, res) => {
  res.send('API is running...');
})

const authRoutes = require ('./routes/authRoutes');
app.use('/api', authRoutes);


const refreshRoute = require("./routes/refreshTokenRoute");
app.use("/api/auth", refreshRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
