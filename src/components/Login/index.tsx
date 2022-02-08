import Image from "next/image";
import logo from "../../../public/images/logo.png";

import styles from "./login.module.scss";
import { SignIn } from "../SignIn";
import { SignUp } from "../SignUp";
import { ForgotPassword } from "../ForgotPassword";
import { useState } from "react";

export function Login() {
  const [showSigup, setShowSignup] = useState<boolean>(false);
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);

  function showSignIn() {
    setShowForgotPassword(false);
    setShowSignup(false);
  }
  function changeStateSignup() {
    setShowSignup(true);
  }
  function changeStateForgotPassword() {
    setShowForgotPassword(true);
  }
  return (
    <div className={styles.container}>
      <div className={styles.containerAside}>
        <div className={styles.logo}>
          <Image src={logo} alt="" />
          <button onClick={() => showSignIn()} />
        </div>
        <div className={styles.slogan}>
          <p>
            Share all your thoughts, <br />
            feelings and breakthroughs with our community.
          </p>
        </div>
      </div>

      <main>
        {!showSigup && !showForgotPassword && (
          <SignIn
            showForgotPassword={changeStateForgotPassword}
            showSignup={changeStateSignup}
          />
        )}
        {showSigup && <SignUp showSignIn={showSignIn} />}
        {showForgotPassword && <ForgotPassword showSignIn={showSignIn} />}
      </main>
    </div>
  );
}
