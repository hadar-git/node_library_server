import helmet from 'helmet';
import morgan from 'morgan'
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import express from 'express'
import router from './routes/index.route.js';
import { errorH , notFound} from './middlewares/error.middleware.js';
import {addCurrentDate,checkGETDate } from  './middlewares/users.middleware.js'
const app = express()
app.use(express.json());


const rt= rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
})
app.use(rt);
app.use(addCurrentDate());
app.use(checkGETDate())
// משמש לחיזוק התשובה שחוזרת מהשרת 
app.use(helmet());
// אפשרויות גישה מכל פרוקיט 
app.use(cors());
app.use(morgan('dev'));
app.use('/api',router );
app.use(notFound);
app.use(errorH);
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000')
})