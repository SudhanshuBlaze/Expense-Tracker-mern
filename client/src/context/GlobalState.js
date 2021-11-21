import React, { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";
import axios from "axios";
//initial state
const initialState = {
  transactions: [],
  error: null, //if we want to show alert if there's an error
  loading: true, //use it with a spinner
};

//create context
export const GlobalContext = createContext(initialState);

//provider context
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions
  async function getTransactions(params) {
    try {
      //we dont need to put the entire url as we have set up the proxy in package.json
      const res = await axios.get("/api/v1/transactions");
      //res.data gives the entire object containing success, count, data,
      // but we only want the "data" array in res.data object.
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
        //error.response.data gives us the object which we return in addTransaction function on Validation error in transactionController
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      //post request to our backend server
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({ type: "DELETE_TRANSACTION", payload: id });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/v1/transactions", transaction, config);
      // console.log(res.data.data);
      //note: payload will have only the new object with '_id'
      dispatch({ type: "ADD_TRANSACTION", payload: res.data.data });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        getTransactions,
        error: state.error,
        loading: state.loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
