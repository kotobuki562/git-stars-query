import React, { useState, useEffect } from "react";
import { Widget } from "../components/Widget/Widget";
import { myStars } from "../components/data";
import { Layout } from "../components/Layout";
import Skeleton from "../components/Widget/Skeleton";
import { Button } from "../components/Button/Button";
import useSWR from "swr";

const API_ENDPOINT = "https://api.github.com/users";

// export async function getStaticProps() {
//   const gits1 = [];
//   const fetchGits1 = await fetch(`${FULL_API_ENDPOINT}1`);
//   const data1 = await fetchGits1.json();
//   data1.map((data) => {
//     const gits = { id: data.id, ...data.body };
//     return gits1.push(gits);
//   });
//   return {
//     props: {
//       gits1,
//     },
//     revalidate: 100 * 100,
//   };
// }

const fetcher = (args) => fetch(args).then((res) => res.json());

const Home = () => {
  const [page, setPage] = useState<number | null>(1);
  const [user, setUser] = useState<string | null>("kotobuki562");
  const [query, setQuery] = useState<string | null>("TypeScript");

  // const { data, error } = useSWR(
  //   `${API_ENDPOINT}/${user}/starred?page=${page}&per_page=100`,
  //   fetcher
  // );

  // console.log(data);

  console.log(myStars);

  // if (error) {
  //   return (
  //     <Layout>
  //       <div>
  //         <p>APIのリクエストの制限が超えました。</p>
  //         <p>
  //           詳しくは
  //           <a className="text-teal-400" href={error?.documentation_url}>
  //             こちら
  //           </a>
  //           をご覧ください
  //         </p>
  //         <p>{myStars.length}</p>
  //         {myStars.map((data) => {
  //           const { login, avatar_url, html_url, url } = data.owner;
  //           return (
  //             <div key={data.id} className="w-full">
  //               <Widget
  //                 {...data}
  //                 owner={{
  //                   avatar_url: avatar_url,
  //                   login: login,
  //                   html_url: html_url,
  //                   url: url,
  //                 }}
  //               />
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </Layout>
  //   );
  // }
  if (!myStars) {
    return (
      <Layout>
        <div className="w-full">
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
              useage={myStars.length < 100 ? null : "base"}
              size="md"
              disabled={myStars.length < 100}
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
            useage={myStars.length < 100 ? null : "base"}
            size="md"
            disabled={myStars.length < 100}
            onClick={() => setPage(page + 1)}
          />
        </div>
        <p>{myStars.length}</p>
        {myStars.map((git) => {
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
