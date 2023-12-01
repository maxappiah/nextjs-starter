import Link from "next/link";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer>
      <div className={styles.footer}>
        <p>© 2023</p>
        </div>
    </footer>
  );
}