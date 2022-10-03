const mongodb = require("mongodb").MongoClient;
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

// const hostname = "127.0.0.1";

app.use(express.json());
app.use(cors());

let db;

const connectionString =
  "mongodb+srv://dragon:hello123@travel-destinations.kjlf6mx.mongodb.net/?retryWrites=true&w=majority";

mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  async function (err, client) {
    db = client.db("e_learning");
    console.log("connected to e_learning");
  }
);

app.use(express.json());

app.get("/media/:topic", async (req, res) => {
  console.log(req.params.topic);
  const matchString = req.params.topic;
  const data = await runGet(matchString);
  if (await data) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.send(data);

    //const activity = postNewActivity()
  }
});

async function postNewActivity(studentId, topic) {
  // insert new document into activities collection
  console.log("insert new document into the activities collection");
}

async function runGet(string) {
  // const query = {
  //   topic: { $regex: string },
  // };
  const query = { topic: string };

  console.log(query);
  try {
    const articles = db.collection("media").find(query).toArray();
    console.log(await articles);
    return await articles;
  } catch (err) {
    console.error(err);
  }
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
