import { VFC, useState, useEffect } from "react";
import Link from "next/link";
import cc from "classcat";
import { GiRoundStar } from "react-icons/gi";
import { AiOutlineLink } from "react-icons/ai";
import { HiExternalLink } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";

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
    | string;
  // APIURL
  languages_url: string;
  stargazers_count: number;
  owner: {
    login: string;
    full_name: string;
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
  owner,
}) => {
  // const [languages, setLanguages] = useState();
  // const [userInfo, setUserInfo] = useState<string>();
  // const fetchUserInfo = async () => {
  //   try {
  //     const res = await fetch(owner.url);
  //     const data = await res.json();
  //     setUserInfo(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const fetchLanguages = async () => {
  //   try {
  //     const res = await fetch(languages_url);
  //     const data = await res.json();
  //     setLanguages(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // console.log(languages);
  // console.log(userInfo);

  // useEffect(() => {
  //   fetchLanguages();
  //   fetchUserInfo();
  // }, []);

  return (
    <div className="flex flex-col border-b px-4 pb-4 hover:bg-teal-50">
      <div className="flex items-center pt-4 mb-4">
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
            {name}
          </a>
        </div>
      </div>
      <div className="flex items-center">
        <p className="flex items-center mr-4">
          <GiRoundStar className="text-yellow-400 text-lg mr-1" />
          {stargazers_count.toLocaleString()}
        </p>
        <div className="flex items-center mr-2">
          <span
            className={cc([
              "w-7 h-7 rounded-full flex flex-col items-center justify-center mr-1",
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
            ])}
          >
            {language.slice(0, 1) || null}
          </span>
          <p>{language || null}</p>
        </div>

        {homepage ? (
          <a
            className="hover:bg-teal-100 rounded-full p-1"
            href={`${homepage}`}
          >
            <AiOutlineLink className="text-lg text-teal-600" />
          </a>
        ) : null}

        {/* <p>{languages_url}</p> */}
      </div>
      <div>{/* <p>{clone_url}</p> */}</div>
    </div>
  );
};
