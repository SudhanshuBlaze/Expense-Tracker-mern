const express = require("express");
const {
  getTransaction,
  addTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");
const router = express.Router();

router.route("/").get(getTransaction).post(addTransaction);

router.route("/:id").delete(deleteTransaction);

module.exports = router;
