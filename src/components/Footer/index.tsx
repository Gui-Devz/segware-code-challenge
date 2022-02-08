import Image from "next/image";

import logoFooter from "../../../public/images/Segware-logo-white.webp";

import styles from "./footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image width={130} height={45} src={logoFooter} alt="" />
        </div>

        <p data-testid="footer-paragraph">
          Made by Guilherme with <span>&#10084;</span>
        </p>
      </div>
    </footer>
  );
}
