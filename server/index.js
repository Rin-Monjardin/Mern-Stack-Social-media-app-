import express from 'express';
import bodyParser from 'body-parser'; // allows express to read the body and then parse that into a Json object that we can understand. 
import mongoose from 'mongoose';
import cors from 'cors'; //mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.
import dotenv from 'dotenv'; //simple way to allow you to create secret keys that your application needs to function and keep them from going public.

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config(); // for environmental variable to work 

app.use(bodyParser.json({ limit : "30mb" , extended : true  }));
app.use(bodyParser.urlencoded({ limit : "30mb" , extended : true  }));
app.use(cors());

//  file for post and user 
app.use('/posts' , postRoutes);
app.use('/user' , userRoutes);

const PORT = process.env.PORT ; 

//connecting to mongodb atlas and making a server called localhost:8000
mongoose.connect(process.env.CONNECTION_URL , {useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(PORT) , console.log(`Listening to port ${PORT}`))
    .catch((err) => console.log(err));
