import { VFC } from "react";
import cc from "classcat";
import { GiRoundStar } from "react-icons/gi";
import { AiOutlineLink } from "react-icons/ai";
import { HiExternalLink } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ListItems } from "../ListBox/ListBox";

type StarRepos = {
  name: string;
  // accountURL
  html_url: string;
  // deployURL
  homepage: string;
  clone_url: string;
  language:
    | "HTML"
    | "CSS"
    | "JavaScript"
    | "TypeScript"
    | "Vue"
    | "Elixir"
    | "Dart"
    | "Lue"
    | "SCSS"
    | "Docker"
    | "Ruby"
    | "Python"
    | "PHP"
    | "Rust"
    | "Java"
    | "Vim script"
    | "Shell"
    | "Swift"
    | "M4"
    | "Other"
    | "Assemby"
    | "C#"
    | "Objective-C"
    | "Nim"
    | "Other"
    | "Batchfile"
    | "YAML"
    | "JSON"
    | string
    | null;
  // APIURL
  description: string;
  languages_url: string;
  stargazers_count: number;
  owner: {
    login: string;
    // full_name: string;
    // imageURL
    avatar_url: string;
    html_url: string;
    url: string;
  };
};

export const Widget: VFC<StarRepos> = ({
  name,
  html_url,
  homepage,
  clone_url,
  language,
  languages_url,
  stargazers_count,
  description,
  owner,
}) => {
  return (
    <div className="flex flex-col border-b px-4 pb-2 transition duration-200 hover:ease-in-out hover:transform hover:-translate-y-1 hover:-translate-x-1 hover:bg-teal-50 hover:shadow-md">
      <div className="flex items-center justify-between pt-2 mb-2">
        <div className="flex items-center">
          <div className="mr-4">
            <a href={`https://github.com/${owner.login}`}>
              <img
                className="w-12 h-12 rounded-full"
                src={`${owner.avatar_url}`}
                alt={owner.avatar_url}
              />
            </a>
          </div>
          <div className="flex flex-col">
            <a
              className="font-bold text-lg flex items-center"
              href={`${owner.html_url}`}
            >
              <FaRegUser className="mr-1" />
              {owner.login}
            </a>
            <a className="text-teal-600 flex items-center" href={`${html_url}`}>
              <HiExternalLink className="mr-1" />
              {name.length >= 20 ? `${name.slice(0, 20)}...` : name}
            </a>
          </div>
        </div>

        {homepage ? (
          <ListItems
            link={
              homepage.includes("https://" || "http://")
                ? `${homepage}`
                : `https://${homepage}`
            }
            account={`${owner.html_url}`}
            document={`${html_url}`}
          />
        ) : (
          <ListItems account={`${owner.html_url}`} document={`${html_url}`} />
        )}
      </div>
      {description ? (
        <div className="mb-1 whitespace-pre-wrap">{`${description?.slice(
          0,
          30
        )}...`}</div>
      ) : null}

      <div className="flex items-center">
        <p className="flex items-center mr-4">
          <GiRoundStar className="text-yellow-400 text-lg mr-1" />
          {stargazers_count.toLocaleString()}
        </p>
        <div className="flex items-center mr-2">
          <span
            className={cc([
              "w-3 h-3 rounded-full flex flex-col items-center justify-center mr-2",
              language === "HTML" ? "bg-HTML text-white" : null,
              language === "CSS" ? "bg-CSS text-white" : null,
              language === "TypeScript" ? "bg-TypeScript text-white" : null,
              language === "JavaScript" ? "bg-JavaScript" : null,
              language === "Vue" ? "bg-Vue text-white" : null,
              language === "Elixir" ? "bg-Elixir text-white" : null,
              language === "Docker" ? "bg-Docker text-white" : null,
              language === "Dart" ? "bg-Dart text-white" : null,
              language === "Lue" ? "bg-Lue text-white" : null,
              language === "SCSS" ? "bg-SCSS text-white" : null,
              language === "Ruby" ? "bg-Ruby text-white" : null,
              language === "Python" ? "bg-Python text-white" : null,
              language === "PHP" ? "bg-PHP text-white" : null,
              language === "Java" ? "bg-Java text-white" : null,
              language === "Rust" ? "bg-Rust text-white" : null,
              language === "C" ? "bg-C text-white" : null,
              language === "C++" ? "bg-C++ text-white" : null,
              language === "Vim script" ? "bg-Vimscript text-white" : null,
              // ここから
              language === "Shell" ? "bg-Shell text-white" : null,
              language === "Swift" ? "bg-Swift text-white" : null,
              language === "M4" ? "bg-M4 text-white" : null,
              language === "Other" ? "bg-Other text-white" : null,
              language === "Assemby" ? "bg-Assemby text-white" : null,
              language === "Nim" ? "bg-Nim text-white" : null,
              language === "Objective-C" ? "bg-Objective-C text-white" : null,
              language === "C#" ? "bg-C# text-white" : null,
              language === "JSON" ? "bg-JSON text-white" : null,
              language === "YAML" ? "bg-YAML text-white" : null,
              language === "Batchfile" ? "bg-Batchfile text-white" : null,
            ])}
          >
            {/* {language.slice(0, 1) || null} */}
          </span>
          <p>{language || "Other or MD"}</p>
        </div>

        {homepage ? (
          <a
            className="transition duration-200 hover:bg-teal-100 rounded-full p-1 mr-1"
            href={
              homepage.includes("https://" || "http://")
                ? `${homepage}`
                : `https://${homepage}`
            }
          >
            <AiOutlineLink className="text-xl text-teal-600" />
          </a>
        ) : null}
      </div>
    </div>
  );
};
