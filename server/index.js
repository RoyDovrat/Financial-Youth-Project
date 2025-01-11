const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');

//const usersRouter = require('./Controllers/usersController');
//const authController = require('./Controllers/authController');

const app = express();
const PORT = 3000;

connectDB();

app.use(cors());
app.use('/', express.json());

//app.use('/auth', authController);
//app.use('/users', usersRouter);


app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
});