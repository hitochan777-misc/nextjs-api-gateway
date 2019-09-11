# Next.js throught API gateway

This repository reproduces the situation where a browser does not finish loading a Next.js page forever or completely hangs when the app is served through a proxy server.

There are two directories `client` and `gateway`.
`client` is a Next.js app created by `npx create-next-app`.
`gateway` is a proxy server that forward requests to the Next.js app.

## Reproduction step

1. Open two terminals: one for `client` and the other for `gateway`.
2. For each directory, run `yarn` to install dependencies.
3. Run `yarn start` under `gateway` and `yarn dev` under `client`. Now the proxy server starts to listen on 3000 whereas Next.js app listens on 3001.
4. Access http://localhost:3000
5. It does not finish loading the page and if look at the Network section in chrome developer tool, there are several pending requests.
