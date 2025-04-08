import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import morgan from 'morgan';
import competitionsRoutes from './routes/competitions.js'
import fixturesRoutes from './routes/fixtures.js'
import teamsRoutes from './routes/teams.js'
import playersRoutes from './routes/players.js'
import dbAPIRoutes from './routes/dbAPIRoutes.js'; // Importar las rutas de la API de la base de datos
//import geminiRoutes from './routes/gemini.js';

dotenv.config();  // ⚠️ Cargar variables de entorno antes de usarlas

const app = express();

// Middleware
// 🔹 Configurar CORS de manera segura
const corsOptions = {
    origin: '*', // ✅ Reemplaza con la URL del frontend
    methods: ['GET', 'POST'], // ✅ Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev')); // Registra cada solicitud en la consola

// Usar rutas
app.use('/api/competitions', competitionsRoutes);
app.use('/api/fixtures', fixturesRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/players', playersRoutes);
app.use('/db',dbAPIRoutes);
//app.use('/api/gemini', geminiRoutes);


// Manejo de errores global
app.use((err, req, res, next) => {
    console.error('❌ ERROR:', err.message);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
