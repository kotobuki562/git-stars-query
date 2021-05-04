import React, { useState, useEffect, Fragment } from "react";
import { Widget } from "../components/Widget/Widget";
import { myStars } from "../components/data";
import { Layout } from "../components/Layout";
import Skeleton from "../components/Widget/Skeleton";
import { Button } from "../components/Button/Button";
import { FaSearch, FaCheck } from "react-icons/fa";
import { HiSelector } from "react-icons/hi";
import { Listbox, Transition } from "@headlessui/react";
import useSWR from "swr";

const API_ENDPOINT = "https://api.github.com/users";

const people = [
  { id: 1, name: "TypeScript", unavailable: true },
  { id: 2, name: "JavaScript", unavailable: false },
  { id: 3, name: "HTML", unavailable: false },
  { id: 4, name: "CSS", unavailable: false },
  { id: 5, name: "Vue", unavailable: false },
];

const fetcher = (args) => fetch(args).then((res) => res.json());

const Home = () => {
  const [selected, setSelected] = useState(people[0]);
  const [page, setPage] = useState<number | null>(1);
  const [user, setUser] = useState<string | null>("kotobuki562");
  const [query, setQuery] = useState<string | null>("TypeScript");

  const { data, error } = useSWR(
    `${API_ENDPOINT}/${user}/starred?page=${page}&per_page=100`,
    fetcher
  );

  const filterLanguage = data?.filter((git) =>
    git.language.includes(selected.name)
  );

  const filterLanguageError = myStars.filter((git) =>
    git.language.includes(selected.name)
  );

  if (error) {
    return (
      <Layout>
        <div>
          <p>APIのリクエストの制限が超えました。</p>
          <p>
            詳しくは
            <a className="text-teal-400" href={error?.documentation_url}>
              こちら
            </a>
            をご覧ください
          </p>
          <div className="w-72 top-16">
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
                      {people.map((person, personIdx) => (
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
  if (!filterLanguage) {
    return (
      <Layout>
        <div className="w-full">
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
        <div className="w-72 top-16">
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
                    {people.map((person, personIdx) => (
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
      </div>
    </Layout>
  );
};

export default Home;
