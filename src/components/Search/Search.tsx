import React, { VFC, MouseEventHandler, ChangeEventHandler } from "react";
import { FaUserAlt } from "react-icons/fa";

type SearchInfo = {
  value: string | null;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClick: MouseEventHandler;
};
export const Search: VFC<SearchInfo> = ({ value, onChange, onClick }) => {
  return (
    <div className="transition duration-200 bg-white flex items-center rounded-full shadow-md hover:shadow-lg">
      <input
        className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
        id="search"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Your GitHub ID"
      />
      <div className="py-2 px-4">
        <button
          onClick={onClick}
          className="bg-teal-500 text-white rounded-full p-2 hover:bg-teal-400 focus:outline-none w-12 h-12 flex items-center justify-center"
        >
          <FaUserAlt />
        </button>
      </div>
    </div>
  );
};
