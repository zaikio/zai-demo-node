# zai-demo-node

Demo for Zaikio OAuth flow and app installation per organization.

[DEMO](https://node-demonstrator.zaikio.com)

## Getting Started

First you must create an app in [hub.zaikio.com](https://hub.zaikio.com/).

Then you need to copy your `HUB_OAUTH_CLIENT_ID` and `HUB_OAUTH_CLIENT_SECRET` to an `.env` file.

```
$ cp .env.example .env
```

It is important that you add your URL to the `Redirect URLs` in Directory.
For this test project you need to add `http://localhost:8080`

Install the dependencies and run the dev server.

```
$ npm install
$ npm run start:dev
```
