import io from 'socket.io-client'
import { endpoint } from './api'

export default io(endpoint, { transports: ['websocket'] })
