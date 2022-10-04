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
    const topicTextIndexExists = await db
      .collection("media")
      .indexExists("topic_text");
    if (!topicTextIndexExists) {
      const indexResult = await db
        .collection("media")
        .createIndex({ topic: "text" });
      console.log(`Index created: ${indexResult}`);
    }
  }
);

app.use(express.json());

// get all users
// app.get("/users", async (req, res) => {
//   const users = await runGetAllUsers();
//   if (await users) {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "application/json");
//     res.send(users);
//   } else {
//     res.statusCode = 400;
//     res.setHeader("Content-Type", "application/json");
//     res.send({
//       error: "Could not get users",
//     });
//   }
// });

// async function runGetAllUsers() {
//   try {
//     // add user type title (user role) as a property for every user object
//     // https://www.mongodb.com/docs/upcoming/reference/operator/aggregation/lookup/#pipe._S_lookup
//     // https://stackoverflow.com/questions/2350495/how-do-i-perform-the-sql-join-equivalent-in-mongodb
//     const users = db.collection("users").find({}).toArray();
//     console.log(await users);
//     return await users;
//   } catch (err) {
//     console.error(err);
//   }
// }

// get media that match queried topic
app.get("/media/:topic", async (req, res) => {
  const topic = req.params.topic;
  const articles = await getArticles(topic);

  // test data for student ID - get user ID when implementing user authentication
  const ObjectID = require("mongodb").ObjectId;
  const studentId = ObjectID("633b0ff35328e48afa29985e");

  const activity = await createActivity(studentId, topic);

  if ((await articles) && (await activity)) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.send(articles);
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.send({
      success: false,
      message: "Error while fetching articles or posting new activity",
    });
  }
});

async function getArticles(string) {
  // before creating topic_text index - const query = { topic: string };
  // example of text index usage from mongo manual -  { $text: { $search: "java coffee shop" } }
  const query = { $text: { $search: string } };
  try {
    const articles = db.collection("media").find(query).toArray();
    // const explain = db.collection("media").find(query).explain();
    // console.log(await explain);
    return await articles;
  } catch (err) {
    console.error(err);
  }
}

async function createActivity(studentId, topic) {
  const query = {
    user_id: studentId,
    topic: topic,
    date: new Date(),
  };

  try {
    const newActivityResponse = db.collection("activities").insertOne(query);
    return newActivityResponse;
  } catch (err) {
    console.error(err);
  }
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
