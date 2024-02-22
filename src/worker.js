const { parentPort } = require('worker_threads');

const Interactsh = require('./interactsh');

let interactsh = null;

const createInteractsh = () => {
    const interactsh = new Interactsh();
    interactsh.start();
    return interactsh;
}

parentPort.on('message', (message) => {

    switch(message) {
        case 'start':
            interactsh = createInteractsh();
            parentPort.postMessage('started');
            break;
        case 'getURL':
            if (interactsh) {
                parentPort.postMessage(interactsh.url);
            }
            break;
        case 'getData':
            if (interactsh) {
                parentPort.postMessage(interactsh.mainData);
            }
            break;
        case 'stop':
            if (interactsh) {
                interactsh.stop();
                parentPort.postMessage('stopped');
            }
            break;
        default:
            break;
    }
});