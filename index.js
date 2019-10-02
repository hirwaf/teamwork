import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swagger from 'swagger-ui-express';
import routers from './server/routers';
import swaggerJson from './swagger';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('short'));

app.use('/api/v1/', routers);
app.use('/docs/v1/', swagger.serve, swagger.setup(swaggerJson));
app.listen(PORT, () => {
  console.log(`Magic happens on port ${PORT}`);
});

export default app;