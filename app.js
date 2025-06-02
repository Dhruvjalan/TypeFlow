import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import typingController from './controllers/typingcontroller.js';
const PORT = 3000
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Set up template engine
app.set('views', path.join(__dirname+'/views'));

app.set('view engine', 'ejs');

// Static files
app.use(express.static(__dirname+'/public'));

// Fire controller
typingController(app);

// Listen to port
app.listen(PORT)
console.log("You are listening to port "+PORT)

