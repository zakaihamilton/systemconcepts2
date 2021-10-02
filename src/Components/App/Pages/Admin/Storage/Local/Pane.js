import styles from "./Pane.module.scss";

export default function Pane({ item }) {
    return <div className={styles.root}>
        <div className={styles.title}>
            {item.id}
        </div>
        <div className={styles.value}>

        </div>
    </div>;
}
