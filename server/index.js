const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');

const quizzessRouter = require('./controllers/quizController');
const topicsController = require('./controllers/topicController');
const videosController = require('./controllers/videoController');

const app = express();
const PORT = 3000;

connectDB();

app.use(cors());
app.use('/', express.json());

app.use('/quizzes', quizzessRouter);
app.use('/topics', topicsController);
app.use('/videos', videosController);


app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
});