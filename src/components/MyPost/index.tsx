import axios from "axios";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import cookieCutter from "cookie-cutter";
import styles from "./my-post.module.scss";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

interface MyPostProps {
  setRefreshPosts: Dispatch<SetStateAction<number>>;
  refreshPosts: number;
}

export function MyPost({ refreshPosts, setRefreshPosts }: MyPostProps) {
  const [fieldValue, setFieldValue] = useState<string>("");
  async function sendPost(e: FormEvent) {
    e.preventDefault();

    const body = {
      content: fieldValue,
    };

    if (fieldValue.length === 0) {
      toast.warn("Please enter 1 letter at least!", {
        pauseOnHover: true,
      });
      return;
    }

    const token = cookieCutter.get("token");
    const result = await axios
      .post("https://segware-book-api.segware.io/api/feed", body, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.log(err.message);
        return false;
      });

    if (result === false) {
      toast.error("something went wrong with posting!");
      return;
    }

    setRefreshPosts(refreshPosts + 1);
    setFieldValue("");
  }
  return (
    <div className={styles.myPost}>
      <h1>Share with all of us</h1>
      <form onSubmit={sendPost}>
        <textarea
          name="my_post"
          value={fieldValue}
          onChange={(e) => {
            setFieldValue(e.target.value);
          }}
          placeholder="You can say whatever you want to say!"
          rows={6}
          data-testid="textarea"
        ></textarea>
        <button data-testid="btn-send" type="submit" className={styles.postBtn}>
          Send post
        </button>
      </form>
    </div>
  );
}
