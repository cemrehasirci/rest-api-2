const http = require('http');
const app = require('./src/app.js');
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`${PORT} portunda çalışıyor`)
})
