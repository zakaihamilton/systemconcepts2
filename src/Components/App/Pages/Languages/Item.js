import styles from "./Item.module.scss"

export default function LanguagesItem({ index, style }) {
    return <div className={styles.root} style={style}>{index}</div>;
}
