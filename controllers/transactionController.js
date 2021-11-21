const Transaction = require("../models/Transaction");
// @desc Get all the transactions
// @route GET /api/v1/transactions
// @access Public
exports.getTransaction = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc Add transaction
// @route POST /api/v1/transactions
// @access Public
exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;
    //creates a new doc in Transaction collection
    const transaction = await Transaction.create(req.body);
    //status code 201, create
    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    if ((error.name = "ValidationError")) {
      const messages = Object.values(error.errors).map(val => val.message);
      //status 400,client error, client did not provide proper input
      res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      //status code 500, server error
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};
// @desc Delete transaction
// @route DELETE /api/v1/transactions/:id
// @access Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    //no transaction found
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }
    //note "transaction" is the found object
    await transaction.remove();
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
