import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "super_secret_token";
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, request) {

  const url = request.url;
  if (!url) {
    return;
  }

  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') ?? "";

  const decoded = jwt.verify(token,secret);
  if( !decoded ||!(decoded as JwtPayload).userID){
    ws.close();
    return;
  }

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('working');
});