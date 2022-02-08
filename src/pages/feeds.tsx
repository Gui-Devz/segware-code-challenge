import Head from "next/head";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import Cookies from "cookies";
import cookieCutter from "cookie-cutter";

import axios from "axios";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Feed } from "../components/Feed";
import { MyPost } from "../components/MyPost";

import styles from "../styles/Feed.module.scss";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

type PostContent = {
  id: number;
  content: string;
  likes: number;
  authorName: string;
};

interface FeedsProps {
  data: {
    posts?: PostContent[];
    errorMessage?: string;
  };
}

export default function Feeds({ data }: FeedsProps) {
  const [posts, setPosts] = useState<PostContent[]>(data.posts);
  const [refreshPosts, setRefreshPosts] = useState<number>(0);
  const router = useRouter();

  //treats error coming from server
  useEffect(() => {
    const token = cookieCutter.get("token");
    if (data.errorMessage) {
      toast.error(data.errorMessage, {
        pauseOnHover: true,
      });

      router.push("/");
    }

    //if this pass, it means token is not valid anymore
    if (data.errorMessage && token) {
      //deletes invalid token from cookies
      cookieCutter.set("token", "", { expires: new Date(0) });
      toast.error(data.errorMessage, {
        pauseOnHover: true,
      });

      router.push("/");
    }
  });

  useEffect(() => {
    async function getFeed() {
      const token = cookieCutter.get("token");
      const result: any = await axios
        .get("https://segware-book-api.segware.io/api/feeds", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message, {
            pauseOnHover: true,
          });
          return false;
        });

      if (refreshPosts !== 0 && result) {
        setPosts(result.data);
      }
    }
    getFeed();
  }, [refreshPosts]);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Head>
          <title>Segware Chat Sharing - Post feed</title>
        </Head>
        <MyPost setRefreshPosts={setRefreshPosts} refreshPosts={refreshPosts} />
        <main className={styles.containerFeed}>
          <h2>Feed</h2>
          {posts &&
            posts.map((post) => {
              return (
                <React.Fragment key={post.id}>
                  <Feed
                    post={post}
                    setRefreshPosts={setRefreshPosts}
                    refreshPosts={refreshPosts}
                  />
                </React.Fragment>
              );
            })}
        </main>
      </div>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookie = new Cookies(ctx.req, ctx.res);
  const token = cookie.get("token");

  const result: any = await axios
    .get("https://segware-book-api.segware.io/api/feeds", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return {
        error: "User not Authorized",
      };
    });

  //this returns the error message to the client-side
  if (result.error) {
    return {
      props: {
        data: { posts: [], errorMessage: result.error },
      }, // will be passed to the page component as props
    };
  }

  const posts = result.data.map((post) => {
    return {
      id: post.id,
      content: post.content,
      likes: post.likes,
      authorName: post.username === undefined ? "" : post.username,
    };
  });

  return {
    props: {
      data: { posts: posts },
    }, // will be passed to the page component as props
  };
};
