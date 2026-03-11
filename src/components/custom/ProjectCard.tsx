import styles from "../../app/profile/page.module.css";

type Props = {
  title: string;
  description: string;
  team: string;
  image: string;
};

export default function ProjectCard({ title, description, team, image }: Props) {
  return (
    <div
      className={styles.projectCard}
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <h3>{title}</h3>

      <p>{description}</p>

      <div className={styles.projectFooter}>
        <span>Team Members: {team}</span>
        <button className={styles.leaderBtn}>Leader</button>
      </div>
    </div>
  );
}
