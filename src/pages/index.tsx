import React, { useState, useEffect, Fragment } from "react";
import { Widget } from "../components/Widget/Widget";
import { myStars } from "../components/data";
import { Layout } from "../components/Layout";
import Skeleton from "../components/Widget/Skeleton";
import { Button } from "../components/Button/Button";
import { FaSearch, FaCheck, FaUserAlt } from "react-icons/fa";
import { HiSelector } from "react-icons/hi";
import { Listbox, Transition } from "@headlessui/react";
import useSWR from "swr";

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
          <div className="w-72">
            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                    <span className="block truncate">{selected.name}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <HiSelector
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      static
                      className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    >
                      {languages.map((person, personIdx) => (
                        <Listbox.Option
                          key={personIdx}
                          className={({ active }) =>
                            `${
                              active
                                ? `text-${person.name} bg-amber-100`
                                : `text-${person.name}`
                            }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                          }
                          value={person}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <span
                                  className={`w-5 h-5 bg-${person.name}`}
                                ></span>
                                <p
                                  className={`font-normal text-${person.name}`}
                                >
                                  {person.name}
                                </p>
                              </div>
                              {selected ? (
                                <span
                                  className={`${
                                    active
                                      ? `text-${person.name}`
                                      : `text-${person.name}`
                                  }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                >
                                  <FaCheck
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              )}
            </Listbox>
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
            <div className="transition duration-200 bg-white flex items-center rounded-full shadow-md hover:shadow-lg">
              <input
                className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
                id="search"
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Your GitHub ID"
              />
              <div className="py-2 px-4">
                <button
                  onClick={() => getData()}
                  className="bg-teal-500 text-white rounded-full p-2 hover:bg-teal-400 focus:outline-none w-12 h-12 flex items-center justify-center"
                >
                  <FaUserAlt />
                </button>
              </div>
            </div>
          </div>

          <div className="w-full px-8 mb-8">
            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                    <span className="block truncate">{selected.name}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <HiSelector
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      static
                      className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    >
                      {languages.map((person, personIdx) => (
                        <Listbox.Option
                          key={personIdx}
                          className={({ active }) =>
                            `${
                              active
                                ? `text-${person.name} bg-amber-100`
                                : `text-${person.name}`
                            }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                          }
                          value={person}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`${
                                  selected
                                    ? `font-medium text-${person.name}`
                                    : `font-normal text-${person.name}`
                                } block truncate`}
                              >
                                {person.name}
                              </span>
                              {selected ? (
                                <span
                                  className={`${
                                    active
                                      ? `text-${person.name}`
                                      : `text-${person.name}`
                                  }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                >
                                  <FaCheck
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              )}
            </Listbox>
          </div>

          <div className="w-full flex items-center justify-around">
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
          </div>
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
          <div className="transition duration-200 bg-white flex items-center rounded-full shadow-md hover:shadow-lg">
            <input
              className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
              id="search"
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Your GitHub ID"
            />
            <div className="py-2 px-4">
              <button
                onClick={() => getData()}
                className="bg-teal-500 text-white rounded-full p-2 hover:bg-teal-400 focus:outline-none w-12 h-12 flex items-center justify-center"
              >
                <FaUserAlt />
              </button>
            </div>
          </div>
        </div>

        <div className="w-full mb-8 px-8">
          <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                  <span className="block truncate">{selected.name}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <HiSelector
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options
                    static
                    className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    {languages.map((person, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `${
                            active
                              ? `text-${person.name} bg-amber-100`
                              : `text-${person.name}`
                          }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`${
                                selected
                                  ? `font-medium text-${person.name}`
                                  : `font-normal text-${person.name}`
                              } block truncate`}
                            >
                              {person.name}
                            </span>
                            {selected ? (
                              <span
                                className={`${
                                  active
                                    ? `text-${person.name}`
                                    : `text-${person.name}`
                                }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                              >
                                <FaCheck
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            )}
          </Listbox>
        </div>
        {selected.name === "languages" ? (
          <>
            <div className="w-full flex items-center justify-around">
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
            </div>
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
            <div className="w-full flex items-center justify-around">
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
            </div>
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
