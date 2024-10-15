import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';
const app = express();

dotenv.config();

app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.use('/posts',postRoutes);//through this we add /posts. means each posts start with /posts url and we connect it with our application through express.
// CONNECTION_URL = 'mongodb+srv://Abhishek:Abhishek1524@cluster0.szs88.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

app.use('/user',userRoutes)
const PORT = process.env.PORT|| 5000;

mongoose.connect(process.env.CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
