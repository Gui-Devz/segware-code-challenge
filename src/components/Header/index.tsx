import { useRouter } from "next/router";
import Image from "next/image";
import cookieCutter from "cookie-cutter";

import logo from "../../../public/images/logo.png";
import { AiOutlineLogout } from "react-icons/ai";

import styles from "./header.module.scss";

export function Header() {
  const router = useRouter();
  function logOut() {
    //deletes the token from cookies
    cookieCutter.set("token", "", { expires: new Date(0) });
    router.push("/");
  }
  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <Image src={logo} alt="" />
      </div>
      <div>
        <button onClick={() => logOut()}>
          Logout
          <span>
            <AiOutlineLogout />
          </span>
        </button>
      </div>
    </header>
  );
}
