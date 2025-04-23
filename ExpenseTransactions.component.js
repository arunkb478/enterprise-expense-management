import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../cards/TransactionInfoCard.component";
import moment from "moment";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return React.createElement(
    "div",
    { className: "card" },
    [
      React.createElement(
        "div",
        { className: "flex items-center justify-between" },
        [
          React.createElement(
            "h5",
            { className: "text-lg font-semibold" },
            "Recent Expenses History"
          ),
          React.createElement(
            "button",
            {
              className: "card-btn flex items-center gap-1",
              onClick: onSeeMore,
            },
            [
              "See All ",
              React.createElement(LuArrowRight, { className: "text-base" }),
            ]
          ),
        ]
      ),
      React.createElement(
        "div",
        { className: "mt-6 space-y-4" },
        transactions.slice(0, 5).map((expense) =>
          React.createElement(TransactionInfoCard, {
            key: expense._id,
            title: expense.source,
            icon: expense.icon,
            date: moment(expense.date).format("DD MMM YYYY"),
            amount: expense.amount,
            type: "expense",
            hideDeleteBtn: true,
          })
        )
      ),
    ]
  );
};

export default ExpenseTransactions;
