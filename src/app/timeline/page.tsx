import styles from "./timeline.module.css";

const colors = [
  { name: "Copper", hex: "#b36633" },
  { name: "Martinique", hex: "#323659" },
  { name: "Kashmir Blue", hex: "#5474a1" },
  { name: "Redwood", hex: "#5b1f11" },
  { name: "Gold Sand", hex: "#e7ba80" },
];

export default function Timeline() {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {colors.map((c) => (
          <div
            key={c.name}
            className={styles.card}
            style={{ background: c.hex }}
          >
            <div className={styles.title}>{c.name}</div>
            <div className={styles.hex}>HEX: {c.hex}</div>
          </div>
        ))}
      </div>
    </div>
  );
}