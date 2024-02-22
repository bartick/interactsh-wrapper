const { Worker } = require('node:worker_threads');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const worker = new Worker('./src/worker.js');

app.get('/getURL', async (req, res) => {
    worker.postMessage('getURL');
    worker.once('message', (message) => {
        res.send(message);
    });
});

app.get('/getInteractions', (req, res) => {
    worker.postMessage('getData');
    worker.once('message', (message) => {
        res.send(message);
    });
});

function startServer() {
    worker.postMessage('start');

    worker.once('message', (message) => {
        if(message === 'started') {
            app.listen(3000, () => {
                console.log('Server started on port 3000...');
            });
        }
    }); 
}

module.exports = startServer;

