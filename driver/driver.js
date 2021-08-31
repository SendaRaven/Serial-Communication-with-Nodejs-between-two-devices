import ScaleDriver from '../driver/src/scaleDriver.js';

(async function StartPrecissionScaleDriver() {

    const port = process.env.DRIVER_PORT;
    if (!port) {
        throw new Error('no port in .env set');
    }
    const options = {};

    if (process.env.Driver_BAUDRATE) {
        options.baudRate = parseInt(process.env.Driver_BAUDRATE);
    }

    const intializedScaleDriver = intializeSerialConnection(port, options)

    intializedScaleDriver.stableWeightValueworkflow();
})();

function intializeSerialConnection(port, options) {

    const scaleDriver = new ScaleDriver(port, { ...options });

    scaleDriver.attachListner('open', (data) => {
        console.log('Driver online');
        console.log('Listening.');
    });

    scaleDriver.attachListner('data', (data) => {
        scaleDriver.parseCommand(data);
    });

    return scaleDriver;
}

