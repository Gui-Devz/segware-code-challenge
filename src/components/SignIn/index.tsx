import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import cookieCutter from "cookie-cutter";

import { FaUser } from "react-icons/fa";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./signin.module.scss";
import { useRouter } from "next/router";

toast.configure();

interface SignInProps {
  showForgotPassword: () => void;
  showSignup: () => void;
}

export function SignIn({ showForgotPassword, showSignup }: SignInProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const login = async (e: FormEvent) => {
    e.preventDefault();

    const body = {
      username: username,
      password: password,
    };
    const response: any = await axios
      .post("https://segware-book-api.segware.io/api/sign-in", body)
      .catch((err) => {
        return false;
      });

    if (response === false) {
      toast.error("The username or password is incorrect!", {
        pauseOnHover: true,
      });
      router.push("/");
    }

    if (response) {
      cookieCutter.set("token", response.data);
      router.push("/feeds");
      setUsername("");
      setPassword("");
    }
  };

  //this guarantees user will be redirected if he has already logged in.
  useEffect(() => {
    const cookie = cookieCutter.get("token");
    if (cookie !== undefined) {
      toast.info("You are already logged in!", {
        pauseOnHover: true,
      });
      router.push("/feeds");
    }
  }, []);
  return (
    <>
      <div className={styles.containerLogin}>
        <p>
          <span>
            <FaUser color="white" />
          </span>
          Login
        </p>
      </div>
      <form className={styles.form} onSubmit={login}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          autoComplete="on"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          autoComplete="on"
          required
        />
        <div className={styles.paragraphBtn}>
          <button
            data-testid="btn-open-forgot-password"
            className={styles.forgot}
            onClick={() => showForgotPassword()}
          >
            forgot your password?
          </button>
        </div>
        <button data-testid="btn-login" className={styles.login} type="submit">
          Login
        </button>
        <p>
          Are you new?{" "}
          <button
            data-testid="btn-open-signup"
            className={styles.spanBtn}
            onClick={() => showSignup()}
          >
            Sign up already
          </button>{" "}
        </p>
      </form>
    </>
  );
}
