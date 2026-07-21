import express from 'express';
import cors from 'cors';
import { initDB } from './config/db.js';
import ticketRoutes from './routes/ticketRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', ticketRoutes);

if (process.env.NODE_ENV !== 'test') {
  const PORT = 5000;
  initDB().then(() => {
    app.listen(PORT, () => console.log(`🚀 API active matching connection standard at http://localhost:${PORT}`));
  });
}

export default app;
