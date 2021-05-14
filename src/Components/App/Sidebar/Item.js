import styles from "./Item.module.scss"

export default function SidebarItem({ index, style }) {
    return <div className={styles.root} style={style}>{index}</div>;
}
