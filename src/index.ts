import 'dotenv/config';
import express from 'express';
import router from './api/router';
import { startScheduler } from './scraper/scheduler';

const PORT = process.env.PORT ?? 3000;

const app = express();
app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  startScheduler();
});
