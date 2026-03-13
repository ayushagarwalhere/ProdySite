import styles from "./page.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <span>HOME</span>
      <span>EVENTS</span>
      <span>ABOUT US</span>
      <span>CONTACT</span>
    </div>
  );
}