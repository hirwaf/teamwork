import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swagger from 'swagger-ui-express';
import routers from './server/routers';
import swaggerJson from './swagger';
import Database from './server/database/database';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('short'));

app.use('/api/v2/', routers);
app.use('/docs/v2/', swagger.serve, swagger.setup(swaggerJson));
app.listen(PORT, () => {
  console.log(`Magic happens on port ${PORT}`);
});

export default app;