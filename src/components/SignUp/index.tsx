import axios from "axios";
import { FormEvent, useState } from "react";
import { BiArrowBack } from "react-icons/bi";

import styles from "./signup.module.scss";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

interface SignUpProps {
  showSignIn: () => void;
}

export function SignUp({ showSignIn }: SignUpProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const registerUser = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match!", {
        pauseOnHover: true,
      });
      return;
    }

    const user = {
      username: username,
      password: password,
    };

    const result = await axios
      .post("https://segware-book-api.segware.io/api/sign-up", user)
      .catch((err) => {
        toast.error("Username already exists!", {
          pauseOnHover: true,
        });
        return false;
      });

    if (result) {
      toast.success("Account registered!", {
        pauseOnHover: true,
      });
      showSignIn();
    }
  };
  return (
    <>
      <div className={styles.containerSignup}>
        <p>
          <button data-testid="btn-show-signin" onClick={() => showSignIn()}>
            <BiArrowBack color="white" />
          </button>
          Create your account
        </p>
      </div>
      <form className={styles.form} onSubmit={registerUser}>
        <label htmlFor="username">Username</label>
        <input
          data-testid="username"
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
          data-testid="password"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          autoComplete="on"
          required
        />
        <label htmlFor="password-confirm">Confirm your password</label>
        <input
          data-testid="password-confirm"
          id="password-confirm"
          name="passwordConfirm"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="Enter your password"
          autoComplete="on"
          required
        />

        <button data-testid="btn-signup" type="submit">
          Sign up
        </button>
      </form>
    </>
  );
}
