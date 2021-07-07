import styles from "./Field.module.scss"

export default function Field({ children }) {
    return <div className={styles.root}>
        {children}
    </div>;
}
