import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import productRoutes from '../src/routes/product.routes'
import userRoutes from '../src/routes/user.routes'
import authRoutes from '../src/routes/auth.routes'
import path from 'path'
import cors from 'cors';

const app = express()
const PORT = 3002;

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Disposition'],
};

app.use(bodyParser.json())
app.use(cors(corsOptions))

mongoose.connect('mongodb://localhost:27017/mongostore', {
    family: 4
})
mongoose.connection.on("connected", () => {
    console.log("Conexão com o MongoDB estabelecida com sucesso!")
})
mongoose.connection.on("error", (err) => {
    console.error("Erro na conexão com o MongoDB:", err)
})
app.use(express.static('uploads'));
app.use('/files', express.static(path.resolve(__dirname,"public", "upload")));

app.use('/products', productRoutes)
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log('Servidor rodando em http://localhost:'+PORT)
});