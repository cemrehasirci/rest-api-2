const cors = require('cors');

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization"],
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
    optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);   