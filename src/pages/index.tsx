import React, { useState, useEffect } from "react";
import { Widget } from "../components/Widget/Widget";
import { myStars } from "../components/data";
import { Layout } from "../components/Layout";
import Skeleton from "../components/Widget/Skeleton";
import { Button } from "../components/Button/Button";
import useSWR from "swr";
import { Search } from "../components/Search/Search";
import { Select } from "../components/Select/Select";

const API_ENDPOINT = "https://api.github.com/users";

const languages = [
  { id: 1, name: "languages", unavailable: true },
  { id: 2, name: "TypeScript", unavailable: true },
  { id: 3, name: "JavaScript", unavailable: false },
  { id: 4, name: "HTML", unavailable: false },
  { id: 5, name: "CSS", unavailable: false },
  { id: 6, name: "Vue", unavailable: false },
  { id: 7, name: "Elixir", unavailable: false },
  { id: 8, name: "Dart", unavailable: false },
  { id: 9, name: "Rust", unavailable: false },
  { id: 10, name: "SCSS", unavailable: false },
  { id: 11, name: "Docker", unavailable: false },
  { id: 12, name: "Ruby", unavailable: false },
  { id: 13, name: "Python", unavailable: false },
  { id: 14, name: "PHP", unavailable: false },
  { id: 15, name: "Java", unavailable: false },
  { id: 16, name: "Vim script", unavailable: false },
  { id: 17, name: "Vue", unavailable: false },
];

const fetcher = (args) => fetch(args).then((res) => res.json());

const Home = () => {
  const [selected, setSelected] = useState(languages[0]);
  const [page, setPage] = useState<number | null>(1);
  const [user, setUser] = useState<string | null>("kotobuki562");
  const [query, setQuery] = useState<string | null>("TypeScript");
  const [info, setInfo] = useState<any[] | null>([]);
  const [error, setError] = useState<Error | null>();
  const [loading, setLoading] = useState<boolean>(false);

  // const { data, error } = useSWR(
  //   `${API_ENDPOINT}/${user}/starred?page=${page}&per_page=100`,
  //   fetcher
  // );

  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API_ENDPOINT}/${user}/starred?page=${page}&per_page=100`
      );
      const data = await res.json();
      console.log(data);
      setInfo(data);
      setError(error);
      return setLoading(false);
    } catch (error) {
      console.log(error);
      return setLoading(false);
    }
  };

  const filterLanguage = info?.filter((git) =>
    git.language?.includes(selected.name)
  );

  const filterLanguageError = myStars.filter((git) =>
    git.language.includes(selected.name)
  );

  if (error) {
    return (
      <Layout>
        <div>
          <p>APIのリクエストの制限が超えました。</p>
          <div className="w-full px-8 mb-8">
            <Select
              value={selected}
              onChange={setSelected}
              languages={languages}
            />
          </div>
          <p>{filterLanguageError.length}</p>
          {filterLanguageError.map((data) => {
            const { login, avatar_url, html_url, url } = data.owner;
            return (
              <div key={data.id} className="w-full">
                <Widget
                  {...data}
                  owner={{
                    avatar_url: avatar_url,
                    login: login,
                    html_url: html_url,
                    url: url,
                  }}
                />
              </div>
            );
          })}
        </div>
      </Layout>
    );
  }
  if (loading) {
    return (
      <Layout>
        <div className="w-full">
          <div className="p-8">
            <Search
              value={user}
              onClick={() => getData()}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>

          <div className="w-full px-8 mb-8">
            <Select
              value={selected}
              onChange={setSelected}
              languages={languages}
            />
          </div>

          {/* <div className="w-full flex items-center justify-around">
            <Button
              btnText="前へ"
              useage={page === 1 ? null : "base"}
              size="md"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            />
            <Button
              btnText="次へ"
              useage={filterLanguage.length < 100 ? null : "base"}
              size="md"
              disabled={filterLanguage.length < 100}
              onClick={() => setPage(page + 1)}
            />
          </div> */}
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="w-full">
        <div className="p-8">
          <Search
            value={user}
            onClick={() => getData()}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>

        <div className="w-full mb-8 px-8">
          <Select
            value={selected}
            onChange={setSelected}
            languages={languages}
          />
        </div>
        {selected.name === "languages" ? (
          <>
            {/* <div className="w-full flex items-center justify-around">
              <Button
                btnText="前へ"
                useage={page === 1 ? null : "base"}
                size="md"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              />
              <Button
                btnText="次へ"
                useage={info.length < 100 ? null : "base"}
                size="md"
                disabled={info.length < 100}
                onClick={() => setPage(page + 1)}
              />
            </div> */}
            <p>{info.length}</p>
            {info?.map((git) => {
              const { login, avatar_url, html_url, url } = git.owner;
              return (
                <div key={git.id} className="w-full">
                  <Widget
                    {...git}
                    owner={{
                      avatar_url: avatar_url,
                      login: login,
                      html_url: html_url,
                      url: url,
                    }}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <>
            {/* <div className="w-full flex items-center justify-around">
              <Button
                btnText="前へ"
                useage={page === 1 ? null : "base"}
                size="md"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              />
              <Button
                btnText="次へ"
                useage={filterLanguage.length < 100 ? null : "base"}
                size="md"
                disabled={filterLanguage.length < 100}
                onClick={() => setPage(page + 1)}
              />
            </div> */}
            <p>{filterLanguage.length}</p>
            {filterLanguage?.map((git) => {
              const { login, avatar_url, html_url, url } = git.owner;
              return (
                <div key={git.id} className="w-full">
                  <Widget
                    {...git}
                    owner={{
                      avatar_url: avatar_url,
                      login: login,
                      html_url: html_url,
                      url: url,
                    }}
                  />
                </div>
              );
            })}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;
