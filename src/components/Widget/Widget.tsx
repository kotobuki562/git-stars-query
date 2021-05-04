import { VFC, useState, useEffect } from "react";
import Link from "next/link";

type StarRepos = {
  name: string;
  // accountURL
  html_url: string;
  // deployURL
  homepage: string;
  clone_url: string;
  language: string;
  // APIURL
  languages_url: string;
  owner: {
    login: string;
    full_name: string;
    // imageURL
    avatar_url: string;
    html_url: string;
  };
};

export const Widget: VFC<StarRepos> = ({
  name,
  html_url,
  homepage,
  clone_url,
  language,
  languages_url,
  owner,
}) => {
  // const [languages, setLanguages] = useState();
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

  // useEffect(() => {
  //   fetchLanguages();
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
          <a className="font-bold text-lg" href={`${owner.html_url}`}>
            {owner.login}
          </a>
          <a className="text-teal-600 underline" href={`${html_url}`}>
            {name}
          </a>
        </div>
      </div>
      <div className="flex items-center">
        <p className="mr-4">{language}</p>
        <a className="bg-teal-200 px-2 py-1 rounded-full" href={`${homepage}`}>
          {homepage ? "Link" : "none Link"}
        </a>
        {/* <p>{languages_url}</p> */}
      </div>
      <div>{/* <p>{clone_url}</p> */}</div>
    </div>
  );
};
