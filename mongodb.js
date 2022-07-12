const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log(error);
    }
    client && console.log("Successfully connected ");
    const db = client.db(databaseName);

    //     db.collection("users").findOne(
    //       { _id: ObjectID("62c5c83dee23462db8074f12") },
    //       (error, result) => {
    //         if (error) {
    //           return;
    //         }
    //         console.log(result);
    //       }
    //     );
    //     db.collection("users")
    //       .find({ age: 27 })
    //       .toArray((error, user) => {
    //         if (error) {
    //           return console.log(error);
    //         }
    //         console.log(user);
    //       });
    //     db.collection("users")
    //       .find({ age: 27 })
    //       .count((error, user) => {
    //         if (error) {
    //           return console.log(error);
    //         }
    //         console.log(user);
    //       });
    // db.collection("tasks").findOne(
    //   { _id: ObjectID("62c5c9630ed1af24cc3cbfeb") },
    //   (error, task) => {
    //     if (error) {
    //       return console.log(error);
    //     }
    //     console.log(task);
    //   }
    // );

    // db.collection("tasks")
    //   .find({ completed: false })
    //   .toArray((error, user) => {
    //     if (error) {
    //       return console.log(error);
    //     }
    //     console.log(user);
    //   });

    // const updatePromise = db.collection("users").updateOne(
    //   { _id: ObjectID("62c5b0e2c6682f38744ef2ad") },
    //   {
    //     $inc: {
    //       age: 1,
    //     },
    //   }
    // );

    // updatePromise
    //   .then((resp) => {
    //     console.log(resp.modifiedCount);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    const updatePromise = db
      .collection("users")
      .updateMany(
        { name: "shubham" },
        {
          $set: {
            name: "xyz",
          },
        }
      )
      .then((resp) => {
        console.log(resp.modifiedCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
