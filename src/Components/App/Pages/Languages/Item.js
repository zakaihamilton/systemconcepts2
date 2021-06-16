import styles from "./Item.module.scss"

export default function LanguagesItem({ index, id, name, style }) {
    return <div className={styles.root} style={style}>{name}</div>;
}
