import React from "react";
import { LuTrendingUpDown } from "react-icons/lu";
import WELCOME_CARD from "../../assets/welcome.png";

const StatsInfoCard = ({ icon, label, value, color }) => {
  return React.createElement(
    "div",
    {
      className:
        "flex gap-6 bg-white p-4  rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-40",
    },
    [
      React.createElement(
        "div",
        {
          className: `w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`,
        },
        icon
      ),
      React.createElement("div", {}, [
        React.createElement(
          "h6",
          { className: "text-xs text-gray-500 mb-1" },
          label
        ),
        React.createElement(
          "span",
          { className: "text-[20px]" },
          `Rs. ${value}`
        ),
      ]),
    ]
  );
};

const AuthLayout = ({ children }) => {
  return React.createElement(
    "div",
    { className: "flex" },
    [
      React.createElement(
        "div",
        {
          className: "w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12",
        },
        [
          React.createElement(
            "h2",
            { className: "text-lg font-medium text-black" },
            "Expense Tracker"
          ),
          children,
        ]
      ),
      React.createElement(
        "div",
        {
          className:
            "hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative",
        },
        [
          React.createElement("div", {
            className:
              "w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5",
          }),
          React.createElement("div", {
            className:
              "w-48 h-48 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-[10%]",
          }),
          React.createElement("div", {
            className:
              "w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5",
          }),
          React.createElement(
            "div",
            { className: "grid grid-cols-1 z-20" },
            React.createElement(StatsInfoCard, {
              icon: React.createElement(LuTrendingUpDown),
              label: "Track your Income & Expense",
              value: "430,000.00",
              color: "bg-primary",
            })
          ),
          React.createElement("img", {
            src: WELCOME_CARD,
            alt: "",
            className:
              "w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15",
          }),
        ]
      ),
    ]
  );
};

export default AuthLayout;
