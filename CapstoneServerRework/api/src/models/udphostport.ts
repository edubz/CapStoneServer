import { createUdpPort } from "../controllers/osc/createudpport"
export const udpHostPort = createUdpPort("127.0.0.7" || process.env.IP, 57121);