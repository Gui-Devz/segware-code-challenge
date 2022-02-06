import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/logo.png";

import { FaUser } from "react-icons/fa";

import styles from "./login.module.scss";

export function Login() {
  const user = () => {};
  return (
    <div className={styles.container}>
      <div className={styles.containerAside}>
        <div className={styles.logo}>
          <Image src={logo} alt="" />
        </div>
        <div className={styles.slogan}>
          <p>
            Share all your thoughts, <br />
            feelings and breakthroughs with our community.
          </p>
        </div>
      </div>

      <main>
        <div className={styles.containerLogin}>
          <p>
            <span>
              <FaUser color="white" />
            </span>
            Login
          </p>
        </div>
        <form onSubmit={user}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="text"
            placeholder="Enter your password"
          />
          <Link href="/">forgot your password?</Link>
          <button type="submit">Login</button>
          <p>
            Are you new? <Link href="">Sign up already</Link>{" "}
          </p>
        </form>
      </main>
    </div>
  );
}
