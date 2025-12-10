import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import paymentsRouter from './routes/payment.route';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import logger from './utils/logger';


const app = express();


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));


app.get('/health', (_req, res) => res.json({ status: 'ok' }));


app.use('/api/payments', paymentsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Error handler
app.use((err: any, _req: any, res: any, _next: any) => {
logger.error(err);
const status = err.status || 500;
const message = err.message || 'Internal Server Error';
res.status(status).json({ error: message });
});


export default app;