import React, { useState, useEffect } from "react";
import { Widget } from "../components/Widget/Widget";
import { myStars } from "../components/data";
import { Layout } from "../components/Layout";
import Skeleton from "../components/Widget/Skeleton";
import { Button } from "../components/Button/Button";
import { url } from "node:inspector";

const API_ENDPOINT = "https://api.github.com/users";

const Home = () => {
  const [info, setInfo] = useState<any | null>();
  const [page, setPage] = useState<number | null>(1);
  const [user, setUser] = useState<string | null>("kotobuki562");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (pageQuery: number) => {
    try {
      if (pageQuery) {
        const res = await fetch(
          `${API_ENDPOINT}/${user}/starred?page=${pageQuery}`
        );
        const data = await res.json();
        setInfo(data);
        setLoading(false);
      } else {
        const res = await fetch(`${API_ENDPOINT}/${user}/starred`);
        const data = await res.json();
        setInfo(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  console.log(info);
  // console.log(myStars.length);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  if (info?.documentation_url) {
    return (
      <Layout>
        <div>
          <p>APIのリクエストの制限が超えました。</p>
          <p>
            詳しくは
            <a className="text-teal-400" href={info?.documentation_url}>
              こちら
            </a>
            をご覧ください
          </p>
        </div>
      </Layout>
    );
  }
  if (loading) {
    return (
      <Layout>
        <div>
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
        {/* <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        /> */}
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
            useage={info.length < 30 ? null : "base"}
            size="md"
            disabled={info.length < 30}
            onClick={() => setPage(page + 1)}
          />
        </div>
        <p>{info.length}</p>
        {info.map((data) => {
          const { login, full_name, avatar_url, html_url, url } = data.owner;
          return (
            <div key={data.id} className="w-full">
              <Widget
                {...data}
                owner={{
                  avatar_url: avatar_url,
                  login: login,
                  full_name: full_name,
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
