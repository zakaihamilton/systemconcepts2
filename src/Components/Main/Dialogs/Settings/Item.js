import styles from "./Item.module.scss"

export default function SetttingsItem({ index, style }) {
    return <div className={styles.root} style={style}>{index}</div>;
}
