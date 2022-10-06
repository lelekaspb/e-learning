const mongodb = require("mongodb").MongoClient;
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const jwt = require("jsonwebtoken");

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
    // const topicTextIndexExists = await db
    //   .collection("media")
    //   .indexExists("topic_text");
    // console.log("topic_text index" + topicTextIndexExists);
    // if (!topicTextIndexExists) {
    // const indexResult = await db
    //   .collection("media")
    //   .createIndex({ "$**": "text" });
    // console.log(`Index created: ${indexResult}`);
    // }
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
app.post("/media", async (req, res) => {
  const topic = req.body.topic;
  let studentId = req.body.user_id;
  const articles = await getArticles(topic);
  console.log(topic);
  console.log(studentId);

  // test data for student ID - get user ID when implementing user authentication
  const ObjectID = require("mongodb").ObjectId;
  studentId = ObjectID(studentId);

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
  console.log("get articles");
  // before creating topic_text index -
  const query = { "topic.code": string };
  // example of text index usage from mongo manual -  { $text: { $search: "java coffee shop" } }
  // const query = { $text: { $search: string } };
  console.log(query);
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

app.post("/auth/signup", async (req, res) => {
  const ObjectID = require("mongodb").ObjectId;
  const userTypeId = ObjectID("6335e9a680608acea431216f");
  const query = {
    user_type_id: userTypeId,
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  };

  try {
    const newUser = await db.collection("users").insertOne(query);
    if (newUser) {
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.send({
        success: true,
        message: "User created",
      });
    }
  } catch (err) {
    console.error(err);
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.send({
      success: true,
      message: "Could not create the user",
    });
  }
});

app.post("/auth/signin", async (req, res) => {
  const query = {
    username: req.body.username,
  };

  const user = await db.collection("users").findOne(query);

  if (user) {
    const ObjectID = require("mongodb").ObjectId;
    const userTypeId = ObjectID(user.user_type_id);
    const userType = await db
      .collection("user_types")
      .findOne({ _id: userTypeId });
    if (user.password == req.body.password && userType) {
      // login successful
      const token = jwt.sign({ _id: user._id }, "dragon");
      res.status(200).json({
        user_full_name: user.name,
        token: token,
        user_type: userType.user_type_title,
        user_id: user._id,
        success: true,
        message: `Greetings ${user.name} ! Your user role is ${userType.user_type_title}.`,
      });
    } else {
      res.status(400).json({
        success: false,
        message: `The password is not correct`,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: `User with username ${req.body.username} was not found`,
    });
  }
});

app.get("/students", async (req, res) => {
  console.log("get students");

  try {
    let userType = await db
      .collection("user_types")
      .findOne({ user_type_title: "student" });

    const ObjectID = require("mongodb").ObjectId;
    const userTypeId = ObjectID(userType._id);
    const query = { user_type_id: userTypeId };

    if (userType) {
      try {
        const students = await db.collection("users").find(query).toArray();
        res.status(200).json({
          success: true,
          message: "Student list gathered",
          students: students,
        });
      } catch (err) {
        res
          .status(400)
          .json({ success: false, message: "Could not get student list" });
      }
    }
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ success: false, message: "Could not get student list" });
  }
});

app.post("/activities", async (req, res) => {
  console.log("get activities");
  const ObjectID = require("mongodb").ObjectId;
  const studentId = ObjectID(req.body.student_id);
  const query = { user_id: studentId };

  try {
    const activities = await db
      .collection("activities")
      .find(query)
      .sort({ date: 1 })
      .toArray();
    res.status(200).json({
      success: true,
      message: "Gathered activities",
      activities: activities,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "Could not fetch activities",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
