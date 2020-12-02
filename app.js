const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
const axios = require("axios");
const PORT = process.env.PORT || 8080;
const { AuthorizationCode, AccessToken } = require("simple-oauth2");
require("dotenv").config();

const OAUTH_CLIENT = new AuthorizationCode({
  client: {
    id: process.env.HUB_OAUTH_CLIENT_ID,
    secret: process.env.HUB_OAUTH_CLIENT_SECRET,
  },
  auth: {
    tokenHost: process.env.ZAIKIO_HUB_HOST,
    tokenPath: "/oauth/access_token",
    revokePath: "/api/v1/revoked_access_tokens",
  },
});

app
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .use(
    session({
      secret: process.env.SESSION_KEY,
    })
  )
  .listen(PORT, () => {
    console.log(`Zaikio node demo listening at http://localhost:${PORT}`);
  });

async function getAccessToken(req, res) {
  if (req.session && req.session.zai_access_token) {
    let accessToken = OAUTH_CLIENT.createToken(
      JSON.parse(req.session.zai_access_token)
    );

    try {
      if (accessToken.expired()) {
        accessToken = await accessToken.refresh();
        req.session.zai_access_token = JSON.stringify(accessToken.toJSON());
      }
    } catch (error) {
      console.log("Error refreshing access token: ", error.message);
    }

    axios.defaults.headers.common["Authorization"] =
      "Bearer " + accessToken.token.access_token;
  } else {
    res.redirect(
      OAUTH_CLIENT.authorizeURL({
        redirect_uri: process.env.HUB_OAUTH_REDIRECT_URL,
        scope: "directory.person.r",
      })
    );
    res.end();
  }
}

app.get("/", async (req, res) => {
  await getAccessToken(req, res);

  res.render("pages/index", {
    currentUser: (
      await axios.get(process.env.ZAIKIO_HUB_HOST + "/api/v1/person.json")
    ).data,
    host: process.env.ZAIKIO_HUB_HOST,
  });

  res.end();
});

app.get("/current_person.json", async (req, res) => {
  await getAccessToken(req);

  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify(
      (await axios.get(process.env.ZAIKIO_HUB_HOST + "/api/v1/person.json"))
        .data
    )
  );
});

app.get("/oauth/callback", async (req, res) => {
  try {
    const accessToken = await OAUTH_CLIENT.getToken({
      code: req.query.code,
      redirect_uri: process.env.HUB_OAUTH_REDIRECT_URL,
      scope: "directory.person.r",
    });
    req.session.zai_access_token = JSON.stringify(accessToken.toJSON());
  } catch (error) {
    console.log("Access Token Error", error.message);
  }
  res.redirect("/");
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.render("pages/logout");
});
