import styles from "./Item.module.scss"
import Translation from "@components/Core/Util/Translation"
import Table from "@components/Core/UI/Layout/Table"
import Language from "@components/Core/Util/Language"
import Bar from "@components/Core/UI/Layout/Bar"
import clsx from "clsx"

export default function LanguagesItem({ index, style }) {
    const translation = Translation.useTranslation();
    const languageState = Language.State.useState();
    const { items } = Table.Items.useItems();
    const item = items[index];
    const onClick = () => {
        Object.assign(languageState, item);
    };
    const selected = languageState?.id === item?.id;
    return <Bar onClick={onClick} className={clsx(styles.root, selected && styles.selected)} style={style}>
        <div className={styles.field}>{item?.name}</div>
        <div className={styles.field}>{item?.id}</div>
        <div className={styles.field}>{translation?.[item?.direction?.toUpperCase()]}</div>
    </Bar>;
}
