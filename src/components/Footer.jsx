import styles from "./Sidebar.module.css";
function Footer({ children }) {
  return (
    <footer className={styles.footer}>
      {/* <p className={styles.footer}>
          &copy; Copyright {new Date().getFullYear()} by worldwise co.
        </p> */}
      {children}
    </footer>
  );
}

export default Footer;
