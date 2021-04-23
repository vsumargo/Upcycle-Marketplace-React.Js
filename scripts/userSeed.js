const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project3");

const userSeed = [
  {
    email: "vince@gmail.com",
    password: "$2b$10$vVSpkzklY88oifvR1LLv1ujrqbFc5Uq2sl8oaf0nRBP98T6TgnzJG",
    createdAt: new Date(Date.now()),
  },
  {
    email: "asd@gmail.com",
    password: "$2b$10$vVSpkzklY88oifvR1LLv1ujrqbFc5Uq2sl8oaf0nRBP98T6TgnzJG",
    createdAt: new Date(Date.now()),
  },
  {
    email: "qwe@gmail.com",
    password: "$2b$10$vVSpkzklY88oifvR1LLv1ujrqbFc5Uq2sl8oaf0nRBP98T6TgnzJG",
    createdAt: new Date(Date.now()),
  },
  {
    email: "zxc@gmail.com",
    password: "$2b$10$vVSpkzklY88oifvR1LLv1ujrqbFc5Uq2sl8oaf0nRBP98T6TgnzJG",
    createdAt: new Date(Date.now()),
  },
  {
    email: "abc@gmail.com",
    password: "$2b$10$vVSpkzklY88oifvR1LLv1ujrqbFc5Uq2sl8oaf0nRBP98T6TgnzJG",
    createdAt: new Date(Date.now()),
  },
];

db.User.remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
