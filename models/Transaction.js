const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: [true, "Please add some text"],
  },
  amount: {
    type: Number,
    required: [true, "Please add a positive or negative number"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//returns the model which can be used to create new doc/articles,
//all the articles will be saved in transactions collection
module.exports = mongoose.model("Transactions", TransactionSchema);
