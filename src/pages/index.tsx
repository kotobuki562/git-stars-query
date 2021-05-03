import React, { useState, useEffect } from "react";
import { Widget } from "../components/Widget/Widget";
import { myStars } from "../components/data";

const API_ENDPOINT = "https://api.github.com/users/kotobuki562/starred";

const Home = () => {
  const [info, setInfo] = useState([]);
  const [page, setPage] = useState<number | null>(1);

  const fetchData = async (pageQuery: number) => {
    try {
      if (pageQuery) {
        const res = await fetch(`${API_ENDPOINT}?page=${pageQuery}`);
        const data = await res.json();
        setInfo(data);
      } else {
        const res = await fetch(`${API_ENDPOINT}`);
        const data = await res.json();
        setInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(info);
  // console.log(myStars.length);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <div className="w-screen">
      <button onClick={() => setPage(page + 1)}>次へ</button>
      <p>{info.length}</p>
      {info.map((data) => {
        const {
          login,
          full_name,
          avatar_url,
          html_url,
          repos_url,
        } = data.owner;
        return (
          <div key={data.id} className="w-full">
            <Widget
              {...data}
              owner={{
                avatar_url: avatar_url,
                login: login,
                full_name: full_name,
                html_url: html_url,
                repos_url: repos_url,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Home;
