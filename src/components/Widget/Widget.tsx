import type { VFC } from "react";
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
    // APIURL
    repos_url: string;
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
  return (
    <div className="w-screen flex flex-col border-b px-4 pb-4 mb-4">
      <div className="flex items-center mb-4">
        <div className="mr-4">
          <a href={`https://github.com/${owner.login}`}>
            <img
              className="w-20 h-20 rounded-full"
              src={`${owner.avatar_url}`}
              alt={owner.avatar_url}
            />
          </a>
        </div>
        <div className="flex flex-col">
          <a className="font-bold text-lg" href={`${owner.html_url}`}>
            {owner.login}
          </a>
          <a href={`${owner.repos_url}`}>repos</a>
        </div>
      </div>
      <div className="flex flex-col">
        <a href={`${html_url}`}>{name}</a>
        <p>{language}</p>
        <p>{languages_url}</p>
      </div>
      <div>
        <a href={`${homepage}`}>{homepage || "none URL"}</a>
        <p>{clone_url}</p>
      </div>
    </div>
  );
};
