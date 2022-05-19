const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const { ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

//user: todo-app
//pass: jEh1UgpljsxDfex2

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://todo-app:jEh1UgpljsxDfex2@cluster0.6wzgk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    console.log("Database connected");
    const todocollection = client.db("todo-app").collection("todos");

    // get all furniture from database
    app.get("/todos", async (req, res) => {
      const query = {};
      const cursor = todocollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    // add new furniture
    app.post("/todos", async (req, res) => {
      const newService = req.body;
      const result = await todocollection.insertOne(newService);
      res.send(result);
    });

    //Delete
    app.delete("/todos/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await todocollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from todo list!");
});

app.listen(port, () => {
  console.log(`todo app listening on port ${port}`);
});
