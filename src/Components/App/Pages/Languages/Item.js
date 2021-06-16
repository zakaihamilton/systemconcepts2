import styles from "./Item.module.scss"
import Translation from "@components/Core/Util/Translation"
import Bar from "@components/Core/UI/Layout/Bar"

export default function LanguagesItem({ index, id, name, style }) {
    const languages = Translation.State.useState();
    const items = Object.keys(languages).map(key => languages[key]);
    const item = items[index];
    return <Bar className={styles.root} style={style}>
        <div className={styles.field}>{item?.name}</div>
        <div className={styles.field}>{item?.direction}</div>
    </Bar>;
}
