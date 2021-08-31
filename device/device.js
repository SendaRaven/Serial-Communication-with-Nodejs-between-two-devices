import Scale from '../device/src/scale.js';

(function StartPrecissionScaleDEVICE() {

    const port = process.env.DEVICE_PORT;
    if (!port) {
        throw new Error('no port in .env set');
    }
    const options = {};

    if (process.env.DEVICE_BAUDRATE) {
        options.baudRate = parseInt(process.env.DEVICE_BAUDRATE);
    }

    initializeScale(port, options);
})();

function initializeScale(port, options) {
    const scale = new Scale(port, { ...options });
    scale.attachListner('open', (data) => {
        console.log('Device online');
        console.log('Listening.');
    });
    scale.attachListner('data', (data) => {
        scale.parseCommand(data);
    });
}
