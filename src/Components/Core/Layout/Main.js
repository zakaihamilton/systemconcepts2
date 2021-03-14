import styles from "./Main.module.scss"

export default function Main({ children, ...props }) {
    return <main className={styles.root} {...props}>
        {children}
    </main>;
}
