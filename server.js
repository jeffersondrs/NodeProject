const http = require('http');

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true,
}).then(con => {
    console.log(`DB conectado com sucesso: ${con.connection.host}`);
})

// const hostname = '127.0.0.1';
// const port = process.env.port || 4500;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Coontent-type', 'text/plain');
//     res.end('Server online')
// })

// server.listen(port, hostname, () => {
//     console.log(`Server runing at http://${hostname}:${port}`);
// })

const port = process.env.port || 4500;
app.listen(port, '127.0.0.1', () => {
    console.log(`Server started on port ${port}`);
});