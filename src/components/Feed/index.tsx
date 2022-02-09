import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import cookieCutter from "cookie-cutter";

import { AiOutlineLike } from "react-icons/ai";

import styles from "./feed.module.scss";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

type Post = {
  id: number;
  content: string;
  likes: number;
  authorName: string;
};

interface FeedProps {
  post: Post;
  setRefreshPosts: Dispatch<SetStateAction<number>>;
  refreshPosts: number;
}

export function Feed({ post, setRefreshPosts, refreshPosts }: FeedProps) {
  async function upVote(id: number) {
    const body = {
      feedId: id,
      like: true,
      love: true,
    };

    const token = cookieCutter.get("token");
    const response = await axios
      .post("https://segware-book-api.segware.io/api/reaction", body, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.log(err.message);
        return false;
      });

    if (response === false) {
      toast.error("something went wrong with up voting!");
      return;
    }

    setRefreshPosts(refreshPosts + 1);
  }
  return (
    <>
      <div className={styles.feed}>
        <p>{post.content}</p>
        <div className={styles.upVote}>
          <button data-testid="btn-upvote" onClick={() => upVote(post.id)}>
            <AiOutlineLike />
          </button>
          <span>{post.likes}</span>
        </div>
      </div>
    </>
  );
}
