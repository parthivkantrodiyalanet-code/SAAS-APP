import express from 'express';
import {connectDB} from './config/db';
import {userRoutes} from './routes/user.route';
import cookieParser from 'cookie-parser';
import { taskRoutes } from './routes/task.route';
import { projectRoutes } from './routes/project.route';
import cors from 'cors';
import { authRoutes } from './routes/auth.route';

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
)

const apiRoutes:object = {
    user: userRoutes,
    task: taskRoutes,
    project: projectRoutes,
    auth: authRoutes
}
for (const [endpoint,route] of Object.entries(apiRoutes)){
    app.use(`/api/${endpoint}`, route);
}

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})