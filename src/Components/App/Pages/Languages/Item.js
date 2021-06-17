import styles from "./Item.module.scss"
import Translation from "@components/Core/Util/Translation"
import Bar from "@components/Core/UI/Layout/Bar"

export default function LanguagesItem({ index, style }) {
    const languages = Translation.State.useState();
    const translation = Translation.useTranslation();
    const items = Object.keys(languages).map(key => languages[key]);
    const item = items[index];
    return <Bar className={styles.root} style={style}>
        <div className={styles.field}>{item?.name}</div>
        <div className={styles.field}>{item?.id}</div>
        <div className={styles.field}>{translation[item?.direction.toUpperCase()]}</div>
    </Bar>;
}
