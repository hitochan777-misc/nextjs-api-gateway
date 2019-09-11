const express = require("express");
const proxy = require("http-proxy-middleware");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const withAuthHandler = handler => async (req, res, ...restArgs) => {
  try {
    const sessionCookie = req.cookies && req.cookies.session;
    if (sessionCookie) {
      const decodedIdToken = await admin
        .auth()
        .verifySessionCookie(sessionCookie, true);
      req.headers["uid"] = decodedIdToken.uid;
    }
  } catch (error) {
    res.clearCookie("session");
  }
  return handler(req, res, ...restArgs);
};

const GRAPHQL_PATH = "/graphql";
const GRAPHQL_ENDPOINT = "http://localhost:3001";
const FRONT_APP_ENDPOINT = "http://localhost:3002";

const server = express();

server.use(cors());
server.use(cookieParser());
// server.use(
//   GRAPHQL_PATH,
//   proxy({ target: GRAPHQL_ENDPOINT, changeOrigin: true })
// );
server.use(
  "*",
  withAuthHandler(proxy({ target: FRONT_APP_ENDPOINT, changeOrigin: true }))
);

server.listen("3000", () => console.log("Server Listening on Port", 3000));
