import { WebSocketServer , WebSocket } from "ws";
import jwt, { decode, JwtPayload } from "jsonwebtoken";
import { JWT_SECRET_WORD } from "@repo/backend-common/config";

const secret = JWT_SECRET_WORD;
if (!secret) {
  throw new Error("JWT_SECRET must be defined in environment variables");
}
const wss = new WebSocketServer({ port: 8080 });

interface User{
  ws : WebSocket,
  rooms : string[],
  userId : string
}

const users : User[] = [];

function checkUser(token: string): string | null {

  const decoded = jwt.verify(token, secret);
  if (typeof decoded == "string") {
    return null;
  }

  if (!decoded || !decoded.userID) {
    return null;
  }

  return decoded.userID;
}

wss.on('connection', function connection(ws, request) {

  const url = request.url;
  if (!url) {
    return;
  }

  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') ?? "";

  const authenticatedUserId = checkUser(token);
  if (!authenticatedUserId) {
    ws.close();
    return null;
  }

  users.push({
    ws,
    rooms: [],
    userId: authenticatedUserId
  })

  ws.on('message', function message(data) {

    const parsedData = JSON.parse(data as unknown as string);
    
  });

});