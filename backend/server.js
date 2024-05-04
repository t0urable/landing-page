require('dotenv').config();

const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const uploadRoutes = require('./routes/uploadroutes');
const fileRoutes = require('./routes/fileroutes'); 
const deleteroutes = require('./routes/deleteroutes');
const updateroutes = require('./routes/updateroutes');
const cors = require('cors');

//CORs request
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = ['http://localhost:1764', 'https://localhost:1764'];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization, X-Custom-Header",
    credentials: true,
    optionsSuccessStatus: 200
}));


app.use(express.json());

//routes for supabase uploads
app.use('/api', [uploadRoutes, fileRoutes ]);

//certs
const httpsOptions = {
    key: fs.readFileSync('localhost+2-key.pem'),
    cert: fs.readFileSync('localhost+2.pem')
};

const server = https.createServer(httpsOptions, app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on HTTPS at port ${PORT}`);
});
