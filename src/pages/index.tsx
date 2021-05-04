import React, { useState, useEffect } from "react";
import { Widget } from "../components/Widget/Widget";
import { myStars } from "../components/data";
import { Layout } from "../components/Layout";
import Skeleton from "../components/Widget/Skeleton";
import { Button } from "../components/Button/Button";

const API_ENDPOINT = "https://api.github.com/users/kotobuki562/starred";

const Home = () => {
  const [info, setInfo] = useState([]);
  const [page, setPage] = useState<number | null>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (pageQuery: number) => {
    try {
      if (pageQuery) {
        const res = await fetch(`${API_ENDPOINT}?page=${pageQuery}`);
        const data = await res.json();
        setInfo(data);
        setLoading(false);
      } else {
        const res = await fetch(`${API_ENDPOINT}`);
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
        <div className="w-full flex items-center justify-around">
          <Button
            btnText="前へ"
            useage="base"
            size="sm"
            onClick={() => setPage(page - 1)}
          />
          <Button
            btnText="次へ"
            useage={info.length < 30 ? null : "base"}
            size="sm"
            disabled={info.length < 30}
            onClick={() => setPage(page + 1)}
          />
        </div>

        <p>{info.length}</p>
        {info.map((data) => {
          const { login, full_name, avatar_url, html_url } = data.owner;
          return (
            <div key={data.id} className="w-full">
              <Widget
                {...data}
                owner={{
                  avatar_url: avatar_url,
                  login: login,
                  full_name: full_name,
                  html_url: html_url,
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
