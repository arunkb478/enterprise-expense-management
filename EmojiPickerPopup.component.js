import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return React.createElement(
    "div",
    { className: "flex flex-col md:flex-row items-start gap-5 mb-6" },
    [
      React.createElement(
        "div",
        {
          className: "flex items-center gap-4 cursor-pointer",
          onClick: () => setIsOpen(true),
        },
        [
          React.createElement(
            "div",
            {
              className:
                "w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg",
            },
            icon
              ? React.createElement("img", {
                  src: icon,
                  alt: "",
                  className: "w-8 h-8",
                })
              : React.createElement(LuImage)
          ),
          React.createElement(
            "p",
            { className: "text-sm text-black" },
            icon ? "Change Icon" : "Pick Icon"
          ),
        ]
      ),
      isOpen &&
        React.createElement(
          "div",
          { className: "relative" },
          [
            React.createElement(
              "button",
              {
                className:
                  "w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer",
                onClick: () => setIsOpen(false),
              },
              React.createElement(LuX)
            ),
            React.createElement(EmojiPicker, {
              open: isOpen,
              onEmojiClick: (emoji) => onSelect(emoji?.imageUrl || ""),
            }),
          ]
        ),
    ]
  );
};

export default EmojiPickerPopup;
