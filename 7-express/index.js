const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs-extra");
const util = require("util");
const store = require("./redux");

const app = express();
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send("Hello World");
});

app.delete("/", function(req, res) {
  store.dispatch({
    type: "CLEAR"
  });
  res.status(200).send();
});

app.post("/cache/:key", function(req, res) {
  const key = req.params.key;
  console.log(`Caching item at ${key}`);
  store.dispatch({
    type: "ADD",
    payload: { key, value: req.body }
  });
  res.status(201).send();
});

app.get("/cache/:key", function(req, res) {
  const key = req.params.key;
  let item = store.getState()[key];
  if (item) {
    console.log(`Cache hit for ${key}`);
  } else {
    console.log(
      `Cache miss for ${key}, pretending to go to some other server to fetch it`
    );
    item = { wasGenerated: true };
    store.dispatch({
      type: "ADD",
      payload: { key, value: item }
    });
  }
  res
    .status(200)
    .contentType("application/json")
    .send();
});

app.delete("/cache/:key", function(req, res) {
  const key = req.params.key;
  console.log(`Deleting from cache item at ${key}`);
  store.dispatch({
    type: "DELETE",
    payload: { key }
  });
  res.status(201).send();
});

app.get("/state", function(req, res) {
  res.contentType("application/json").send(store.getState());
});

app.get("/persistToDisk", async function(req, res) {
  await flushToDisk();
  res.status(201).send();
});
app.get("/loadFromDisk", async function(req, res) {
  try {
    await loadFromDisk();
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error loading from disk");
  }
  res.status(200).send();
});

const port = 1337;
var server = app.listen(port, async function() {
  console.info(
    `Redux cache app listening on port ${port}, trying to load state file`
  );
  try {
    await loadFromDisk();
  } catch (err) {
    console.error(err);
  }
});

process.on("uncaughtException", function(err) {
  console.error("Unhandled Error on process : \n", util.inspect(err));
  process.exit(1);
});

process.on("exit", function() {
  console.log("Redux cache app is exiting");
});

process.on("SIGTERM", async function() {
  console.log("SIGTERM received stopping processing.");
  await flushToDisk();
  process.exit(1);
});

process.on("SIGINT", function() {
  server.close();
  console.log("SIGINT received stopping processing.");
  flushToDisk().then(() => {
    process.exit(1);
  });
});

async function flushToDisk() {
  const state = store.getState();
  await fs.writeJson("./state.json", state);
  console.log("written to disk");
}

async function loadFromDisk() {
  const newState = await fs.readJson("./state.json");
  console.log(newState);
  store.dispatch({
    type: "REPLACE",
    payload: newState
  });
  console.log("Loaded from disk");
}
