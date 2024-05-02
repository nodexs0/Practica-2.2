import express from 'express';
import { urlencoded } from 'express';
import { engine } from 'express-handlebars';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { dynamicContent } from './dynamicContent.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const images = Object.keys(dynamicContent);
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const imageData = dynamicContent[randomImage];

    res.status(200);
    res.render('home', {
        name: imageData.name,
        message: imageData.message,
        imageUrl: imageData.path,
        pageUrl: imageData.url
    });
});

app.get('/perfil', (req, res) => {
    const images = Object.keys(dynamicContent);
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const imageData = dynamicContent[randomImage];

    res.status(200);
    res.render('perfil', {
        name: imageData.name,
        message: imageData.message,
        imageUrl: imageData.path,
        pageUrl: imageData.url
    });
});

app.put('/perfil', (req, res) => {
    const images = Object.keys(dynamicContent);
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const imageData = dynamicContent[randomImage];

    res.status(200);
    res.render('perfil', {
        name: imageData.name,
        message: imageData.message,
        imageUrl: imageData.path,
        pageUrl: imageData.url
    });
});

app.put('/perfil', (req, res, next) => {
    const err = new Error('Fallo muestra de perfil');
    err.status = 500;
    next(err);
});

app.get('/generar-error', (req, res, next) => {
    const err = new Error('El servidor no soporto :(');
    err.status = 500;
    next(err);
});

app.use((req, res) => {
    res.status(404)
    res.render('404');
});

app.use((err, req, res, next) => {
    res.status(500);
    res.render('500', { error: err });
});

app.listen(PORT, () => { 
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});