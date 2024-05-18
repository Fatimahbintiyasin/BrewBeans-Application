// app.js
import express from 'express';
import bodyParser from'body-parser';
import productRoutes from './app/routes/productRoutes.js';
import basketRoutes from './app/routes/basketRoutes.js';
import basketItemsRoutes from './app/routes/basketItemsRoutes.js';
import basketStatusRoutes from './app/routes/basketStatusRoutes.js';
import shopperRoutes from './app/routes/shopperRoutes.js';
import webRoutes from './app/routes/webRoutes.js';
import connectToDatabase from './app/utils/connectServer.js';




const app = express();

// Middleware


// Parse JSON data
app.use(bodyParser.json());

// // Parse URL-encoded form data
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public')); // Static files folder (if any)

// // Parse JSON data
// app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));


//fix for path
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'/public')));


// Routes
app.use('/', productRoutes);
app.use('/', basketRoutes);
app.use('/', basketItemsRoutes);
app.use('/', basketStatusRoutes);
app.use('/', shopperRoutes);
app.use('/', webRoutes);


connectToDatabase();

// setupDatabase();


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;