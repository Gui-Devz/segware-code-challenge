import axios from "axios";
import { FormEvent, useState } from "react";
import { BiArrowBack } from "react-icons/bi";

import styles from "./forgot-password.module.scss";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

interface ForgotPasswordProps {
  showSignIn: () => void;
}

export function ForgotPassword({ showSignIn }: ForgotPasswordProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const recoverPassword = async (e: FormEvent) => {
    e.preventDefault();

    if (username.length > 0) {
      const response: any = await axios
        .get(
          `https://segware-book-api.segware.io/api/forgot-password/${username}`
        )
        .catch((err) => {
          return false;
        });

      if (response === false || response.data.password === undefined) {
        setPassword("");
        toast.error("Username does not exist!");
        return;
      }

      setPassword(response.data.password);
    }
  };
  return (
    <>
      <div className={styles.containerForgotPassword}>
        <p>
          <button onClick={() => showSignIn()}>
            <BiArrowBack color="white" />
          </button>
          Recover your password
        </p>
      </div>
      <form className={styles.form} onSubmit={recoverPassword}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          minLength={1}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          autoComplete="on"
          required
        />
        {password.length > 0 && (
          <p className={styles.password}>
            Your password is: <span>{password}</span>
          </p>
        )}
        <button type="submit">Recover</button>
      </form>
    </>
  );
}
