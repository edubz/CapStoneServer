const osc = require('osc');
import { createOscMessage, oscMessage } from "../controllers/createoscmessage"

const udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57121,
    metadata: false
});

udpPort.open();

// udpPort.on("ready", () => udpPort.close())

const oscRoute = (req: Request, res: Response) => {

}

export { oscRoute, udpPort, createOscMessage };