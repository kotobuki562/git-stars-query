import React, {
  ReactElement,
  VFC,
  MouseEventHandler,
  ChangeEventHandler,
} from "react";

type SearchInfo = {
  value: string | null;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClick: MouseEventHandler;
  type: "user" | "search";
  icon: ReactElement;
};
export const Search: VFC<SearchInfo> = ({
  value,
  onChange,
  onClick,
  type,
  icon,
}) => {
  return (
    <div className="transition duration-200 hover:ease-in-out hover:transform hover:-translate-y-1 bg-white flex items-center rounded-full shadow-md hover:shadow-lg">
      <input
        className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
        id="search"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={type === "user" ? "Your GitHub ID" : "Repository Name"}
      />
      <div className="py-1 px-4">
        <button
          onClick={onClick}
          className="bg-teal-500 text-white rounded-full p-1 hover:bg-teal-400 focus:outline-none w-12 h-12 flex items-center justify-center"
        >
          {icon}
        </button>
      </div>
    </div>
  );
};
