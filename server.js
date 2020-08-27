const express = require("express");
const cors=require('cors');
const app = express();
const mongoose=require('mongoose');
app.use(cors());
app.use(express.json());
mongoose.connect(
  "mongodb+srv://alien:111@cluster0.gwh8e.mongodb.net/fullStackMernApp?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);


app.use(express.json());

// Defining Routes
app.use("/users", require("./routes/users"));
app.use("/posts", require("./routes/posts"));

app.listen(4000, () => console.log('Server started on port 4000'));
